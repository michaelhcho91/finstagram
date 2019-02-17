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

    this.handleClick = this.handleClick.bind(this);
    this.followUser = this.followUser.bind(this);
    this.unfollowUser = this.unfollowUser.bind(this);
  }
  
  componentDidMount() {
    window.scrollTo(0, 0);

    const {
      fetchPosts,
      fetchComments,
      fetchUser
    } = this.props;
    
    fetchPosts();
    fetchComments();
    if (this.props.match.params.userId) {
      fetchUser(this.props.match.params.userId);
    }
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
      uploadShow
    } = this.state;
    
    let thisUser = user ? user : currentUser;
    
    const myPosts = posts.filter(post => post.posterId === thisUser.id);
    let postsList = myPosts.map( (post, idx) => {
      return <UserProfileItem post={post} 
                              key={idx}
                              openModal={openModal}
                              thisUser={thisUser} />
    });

    postsList = postsList.length === 0 ? <article className="temp-post-list" /> : postsList;

    const postCount = myPosts.length;
    let postOrPosts = postCount === 1 ? "post" : "posts";
    
    let followingCount = null;
    if (thisUser.followingIds) {
      followingCount = thisUser.followingIds.length;
    }
    let followerCount = null;
    if (thisUser.followerIds) {
      followerCount = thisUser.followerIds.length;
    }
    let followerOrFollowers = followerCount === 1 ? "follower" : "followers";
    
    let followButton;
    if (currentUser && user) {
      if (currentUser.followingIds.includes(user.id)) {
        followButton = <button className="follow-button" onClick={this.unfollowUser}>Following</button>
      } else {
        followButton = <button className="follow-button" onClick={this.followUser}>Follow</button>
      }
    }
    
    let logoutButton = <button className="logout-button" onClick={logout}>Logout</button>;
    let uploadIcon = <img onMouseLeave={() => this.setState({uploadShow: "hide-upload"})} 
                          onMouseEnter={() => this.setState({uploadShow: "show-upload"})} 
                          className="icon-upload" 
                          onClick={this.handleClick} 
                          src={window.upload_icon} />;
    if (thisUser !== currentUser) {
      logoutButton = null;
      uploadIcon = null;
    } else if (thisUser === currentUser) {
      followButton = null;
    }

    let profilePic = <Link to={"profile/edit"}><img src={thisUser.photoUrl} /></Link>;
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
                    <li>{followerCount} {followerOrFollowers}</li>
                    <li>{followingCount} following</li>
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