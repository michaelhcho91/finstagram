import React from "react";
import { Link } from "react-router-dom";
import Footer from "../splash/footer";
import NavbarContainer from "../navbar/navbar_container";
import NavbarShort from "../navbar/navbar_short";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = { currentScrollHeight: null };
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
  
  render() {
    let postsList;
    if (this.props.posts) {
      postsList = this.props.posts.map( (post, idx) => {
        return <li key={idx}><img src={post.photoUrl} /></li>
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
                <img src={this.props.currentUser.photoUrl}/>
              </div>

              <section className="profile-info">
                <div className="username-cog">
                  <h1>{this.props.currentUser.username}</h1>

                  <div>
                    <button onClick={this.props.logout}>Logout</button>
                    <button>cog</button>
                  </div>
                </div>

                <div>
                  <ul className="user-post-follow-list">
                    <li>post count</li>
                    <li>follower count</li>
                    <li>following count</li>
                  </ul>
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