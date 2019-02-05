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
  }
  
  componentDidMount() {
    window.scrollTo(0, 0);

    const {
      fetchPosts,
      fetchLikes,
      fetchComments,
      fetchUser,
      fetchUsers
    } = this.props;
    
    const {
      currentScrollHeight
    } = this.state;
    
    fetchPosts();
    fetchLikes();
    fetchComments();
    fetchUsers();
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
    
    let postsList;
    let myPosts;
    let thisUser;

    if (this.props.match.params.userId) {
      thisUser = user;
    } else thisUser = currentUser;

    if (posts) {
      myPosts = posts.filter(post => post.posterId === thisUser.id);
      postsList = myPosts.map( (post, idx) => {
        return <UserProfileItem post={post} 
                                key={idx}
                                openModal={openModal}
                                thisUser={thisUser} />
      });
    } else postsList = null;

    const postCount = myPosts.length;
    let postOrPosts = "posts";
    if (postCount === 1) postOrPosts = "post";
    
    let navbar;
    if (currentScrollHeight <= 90) {
      navbar = <NavbarContainer />
    } else {
      navbar = <NavbarShort />
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
                    <button className="logout-button" onClick={logout}>Logout</button>
                  </div>
                </div>

                <div>
                  <ul className="user-post-follow-list">
                    <li>{postCount} {postOrPosts}</li>
                    <li>593m followers</li>
                    <li>0 following</li>
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