import React from "react";
import NavbarContainer from "../navbar/navbar_container";
import NavbarShort from "../navbar/navbar_short";
import UserProfileItem from "./user_profile_item";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      currentScrollHeight: null,
      id: this.props.currentUser.id,
      photoFile: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.followUser = this.followUser.bind(this);
    this.unfollowUser = this.unfollowUser.bind(this);
  }
  
  componentDidMount() {
    window.scrollTo(0, 0);

    const {
      fetchPosts,
      fetchComments,
      fetchUser,
      fetchUsers,
      fetchFollows
    } = this.props;
    
    const {
      currentScrollHeight
    } = this.state;
    
    fetchUsers();
    fetchPosts();
    fetchComments();
    fetchFollows();
    if (this.props.match.params.userId) {
      fetchUser(this.props.match.params.userId);
    }
    this.setState({
      currentScrollHeight: window.scrollY
    });

    window.onscroll = () => {
      const newScrollHeight = Math.ceil(window.scrollY / 50) * 50;
      if (currentScrollHeight !== newScrollHeight) {
        this.setState({
          currentScrollHeight: newScrollHeight
        });
      }
    };
  }
  
  handleSubmit(e) {
    e.preventDefault();

    const {
      photoFile
    } = this.state;

    const {
      updateUser
    } = this.props;

    const formData = new FormData();
    if (photoFile) {
      formData.append(
        "user[photo]",
        photoFile
      );
    }

    updateUser(formData);
  }
  
  handleFile(e) {
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      this.setState({
        photoFile: file,
      });
    };

    if (file) fileReader.readAsDataURL(file);

    const form = document.getElementById("profile-form");
  }
  
  followUser() {
    const {
      createFollow,
      user,
      fetchUsers
    } = this.props;

    createFollow({
      following_id: user.id
    });

    fetchUsers();
  }

  unfollowUser() {
    const {
      deleteFollow,
      user,
      currentUser,
      fetchUsers
    } = this.props;

    deleteFollow({
      following_id: user.id,
      follower_id: currentUser.id
    });

    fetchUsers();
  }
  
  render() {
    const {
      posts,
      currentUser,
      openModal,
      logout,
      user,
      follows
    } = this.props;

    const {
      currentScrollHeight
    } = this.state;
    
    let thisUser;
    if (user) {
      thisUser = user;
    } else thisUser = currentUser;
    
    let postsList;
    let myPosts;
    if (posts) {
      myPosts = posts.filter(post => post.posterId === thisUser.id);
      postsList = myPosts.map( (post, idx) => {
        return <UserProfileItem post={post} 
                                key={idx}
                                openModal={openModal}
                                thisUser={thisUser} />
      });
    }

    const postCount = myPosts.length;
    let postOrPosts = "posts";
    if (postCount === 1) postOrPosts = "post";
    
    // let myFollowers;
    // if (follows) {
    //   myFollowers = follows.filter(follow => follow.follower_id === thisUser.id)
    // }
    
    let followingCount = null;
    if (thisUser.followingIds) {
      followingCount = thisUser.followingIds.length;
    }
    let followerCount = null;
    if (thisUser.followerIds) {
      followerCount = thisUser.followerIds.length;
    }
    let followerOrFollowers = "followers";
    if (followerCount === 1) followerOrFollowers = "follower";
    
    let navbar;
    if (currentScrollHeight <= 90) {
      navbar = <NavbarContainer />
    } else {
      navbar = <NavbarShort />
    }
    
    let followButton;
    if (currentUser && user) {
      if (currentUser.followingIds.includes(user.id)) {
        followButton = <button className="follow-button" onClick={this.unfollowUser}>Unfollow</button>
      } else {
        followButton = <button className="follow-button" onClick={this.followUser}>Follow</button>
      }
    }
    
    let logoutButton = <button className="logout-button" onClick={logout}>Logout</button>;
    if (thisUser !== currentUser) {
      logoutButton = null;
    } else if (thisUser === currentUser) {
      followButton = null;
    }
    
    return (
      <>
        {navbar}
      
        <main className="user-profile-container">
          <div className="user-profile">
            <header className="user-profile-info">
              <div className="profile-pic">
                <form id="profile-form" onSubmit={this.handleSubmit}>
                  <input disabled className="profile-file-input" id="profile-file-input" type="file" onChange={this.handleFile}/>
                  <label htmlFor="profile-file-input">
                    <img src={thisUser.photoUrl}/>
                  </label>
                </form>
              </div>

              <section className="profile-info">
                <div className="username-cog">
                  <h1>{thisUser.username}</h1>

                  <div>
                    {logoutButton}
                    {followButton}
                  </div>
                </div>

                <div>
                  <ul className="user-post-follow-list">
                    <li>{postCount} {postOrPosts}</li>
                    <li>{followerCount} {followerOrFollowers}</li>
                    <li>{followingCount} following</li>
                  </ul>
                  <div>
                    <h1 className="profile-name">{thisUser.name}</h1>
                    <span>{thisUser.bio}</span>
                  </div>
                </div>
              </section>
            </header>

            <ul className="user-posts">
              {postsList}
            </ul>
          </div>
        </main>
      </>
    )
  }
}

export default UserProfile;