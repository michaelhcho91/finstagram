import React from "react";
import { Link } from "react-router-dom";
import Footer from "../splash/footer";
import NavbarContainer from "../navbar/navbar_container";
import NavbarShort from "../navbar/navbar_short";

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
    this.props.fetchPosts();
    this.setState({ currentScrollHeight: window.scrollY });

    window.onscroll = () => {
      const newScrollHeight = Math.ceil(window.scrollY / 50) * 50;
      if (this.state.currentScrollHeight !== newScrollHeight) {
        this.setState({ currentScrollHeight: newScrollHeight });
      }
    };
  }
  
  handleSubmit(e) {
    e.preventDefault();

    const { photoFile } = this.state;

    const formData = new FormData();
    if (photoFile) {
      formData.append("user[photo]", photoFile);
    }
  }
  
  handleFile(e) {
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      this.setState({
        photoFile: file,
      });
    };

    const form = document.getElementById("profile-form");

    form.dispatchEvent(new Event("submit"));
  }
  
  render() {
    let postsList;

    if (this.props.posts) {
      postsList = this.props.posts.map( (post, idx) => {
        return <li className="user-post" key={idx}><img src={post.photoUrl} /></li>
      })
    } else postsList = null;
    
    let navbar;
    if (this.state.currentScrollHeight <= 90) {
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
                  <input className="profile-file-input" id="profile-file-input" type="file" onChange={this.handleFile}/>
                  <label htmlFor="profile-file-input">
                    <img src={this.props.currentUser.photoUrl}/>
                  </label>
                </form>
              </div>

              <section className="profile-info">
                <div className="username-cog">
                  <h1>{this.props.currentUser.username}</h1>

                  <div>
                    <button className="logout-button" onClick={this.props.logout}>Logout</button>
                  </div>
                </div>

                <div>
                  <ul className="user-post-follow-list">
                    <li>0 posts</li>
                    <li>0 followers</li>
                    <li>0 following</li>
                  </ul>
                  <div>
                    <h1 className="profile-name">{this.props.currentUser.name}</h1>
                    <span>{this.props.currentUser.bio}</span>
                  </div>
                </div>
              </section>
            </header>

            <ul className="user-posts">
              {postsList}
            </ul>
          </div>
        </main>

        <Footer />
      </>
    )
  }
}

export default UserProfile;