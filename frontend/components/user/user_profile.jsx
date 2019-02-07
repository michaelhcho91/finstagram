import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../navbar/navbar";
import NavbarShort from "../navbar/navbar_short";
import UserProfileItem from "./user_profile_item";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      currentScrollHeight: null,
    };

    this.handleClick = this.handleClick.bind(this);
    this.followUser = this.followUser.bind(this);
    this.unfollowUser = this.unfollowUser.bind(this);
  }
  
  componentDidMount() {
    window.scrollTo(0, 0);

    const {
      fetchPosts,
      fetchComments,
      fetchUsers,
      fetchUser
    } = this.props;
    
    const {
      currentScrollHeight
    } = this.state;
    
    fetchUsers();
    fetchPosts();
    fetchComments();
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

  handleClick() {
    window.onscroll = function () {
      window.scrollTo(0, 0);
    };

    this.props.openModal("create", null);
  }
  
  followUser() {
    const {
      createFollow,
      user,
      currentUser
    } = this.props;

    createFollow({
      following_id: user.id,
      follower_id: currentUser.id
    });
  }

  unfollowUser() {
    const {
      deleteFollow,
      user,
      currentUser
    } = this.props;

    deleteFollow({
      following_id: user.id,
      follower_id: currentUser.id
    });
  }
  
  render() {
    const {
      posts,
      currentUser,
      openModal,
      logout,
      user
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
      navbar = <Navbar />
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
    
    let uploadIcon = <img className="icon-upload" onClick={this.handleClick} src={window.upload_icon} />;
    let logoutButton = <button className="logout-button" onClick={logout}>Logout</button>;
    if (thisUser !== currentUser) {
      logoutButton = null;
      uploadIcon = null;
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
                <Link to={"profile/edit"}><img src={thisUser.photoUrl}/></Link>
              </div>

              <section className="profile-info">
                <div className="username-cog">
                  <h1>{thisUser.username}</h1>

                  <div>
                    {logoutButton}
                    {followButton}
                    {uploadIcon}
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