import React from "react";
import { Link } from "react-router-dom";
import NavbarContainer from "../navbar/navbar_container";
import UserProfileItem from "./user_profile_item";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      uploadShow: "hide-upload"
    };

    this.followerList = this.followerList.bind(this);
    this.followingList = this.followingList.bind(this);
    this.followUser = this.followUser.bind(this);
    this.newPost = this.newPost.bind(this);
    this.unfollowUser = this.unfollowUser.bind(this);
  }
  
  componentDidMount() {
    window.scrollTo(0, 0);

    const {
      fetchComments,
      fetchPosts,
      fetchUser
    } = this.props;
    
    fetchComments();
    fetchPosts();
    if (this.props.match.params.userId) {
      fetchUser(this.props.match.params.userId);
    }
  }

  followerList() {
    const {
      currentUser,
      openModal,
      user
    } = this.props;

    const thisUser = user ? user : currentUser;

    openModal("followers", {
      thisUser
    });
  }

  followingList() {
    const {
      currentUser,
      openModal,
      user
    } = this.props;

    const thisUser = user ? user : currentUser;

    openModal("following", {
      thisUser
    });
  }
  
  followUser() {
    const {
      createFollow,
      currentUser,
      user
    } = this.props;

    createFollow({
      following_id: user.id,
      follower_id: currentUser.id
    });
  }

  newPost() {
    const {
      openModal
    } = this.props;
    
    openModal("create", null);
  }

  unfollowUser() {
    const {
      currentUser,
      deleteFollow,
      user
    } = this.props;

    deleteFollow({
      following_id: user.id,
      follower_id: currentUser.id
    });
  }
  
  render() {
    const {
      currentUser,
      logout,
      posts,
      user
    } = this.props;

    const {
      uploadShow
    } = this.state;
    
    const thisUser = user ? user : currentUser;
    
    const myPosts = posts.filter(post => post.posterId === thisUser.id);
    let postsList = myPosts.map( (post, idx) => {
      return <UserProfileItem post={post} 
                              key={idx}
                              thisUser={thisUser} />
    });

    postsList = postsList.length === 0 ? <article className="temp-post-list" /> : postsList;

    const postCount = myPosts.length;
    const postOrPosts = postCount === 1 ? "post" : "posts";
    const followerCount = thisUser.followerIds.length;
    const followingCount = thisUser.followingIds.length;
    const followerOrFollowers = followerCount === 1 ? "follower" : "followers";
    
    let followButton;
    if (currentUser && user) {
      if (currentUser.followingIds.includes(user.id)) {
        followButton = <button className="follow-button" onClick={this.unfollowUser}>Following</button>
      } else {
        followButton = <button className="follow-button" onClick={this.followUser}>Follow</button>
      }
    }
    
    let logoutButton = <button className="logout-button" onClick={logout}>Logout</button>;
    let uploadIcon = <img onMouseLeave={() => this.setState({ uploadShow: "hide-upload" })}
                          onMouseEnter={() => this.setState({ uploadShow: "show-upload" })}
                          className="icon-upload"
                          onClick={this.newPost}
                          src={window.upload_icon} />;
    if (thisUser !== currentUser) {
      logoutButton = null;
      uploadIcon = null;
    } else if (thisUser === currentUser) {
      followButton = null;
    }

    let profilePic = <Link to={"profile/edit"}>
                      <img src={thisUser.photoUrl} />
                    </Link>;
    if (thisUser !== currentUser) {
      profilePic = <img src={thisUser.photoUrl} />
    }

    return (
      <>
        <NavbarContainer />
      
        <main className="user-profile-container">
          <div className="user-profile">
            <header className="user-profile-info">
              <div className="profile-pic">
                {profilePic}
              </div>

              <section className="profile-info">
                <div className="username-cog">
                  <h1>
                    {thisUser.username}
                  </h1>

                  <div>
                    {logoutButton}
                    {followButton}
                    {uploadIcon}
                    <span className={uploadShow}> Upload a photo!</span>
                  </div>
                </div>

                <div>
                  <ul className="user-post-follow-list">
                    <li>{postCount} {postOrPosts}</li>
                    <li className="follower-number" onClick={this.followerList}>{followerCount} {followerOrFollowers}</li>
                    <li className="following-number" onClick={this.followingList}>{followingCount} following</li>
                  </ul>

                  <div>
                    <h1 className="profile-name">
                      {thisUser.name}
                    </h1>
                    
                    <div className="profile-bio">
                      <span>
                        {thisUser.bio}
                      </span>
                    </div>
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