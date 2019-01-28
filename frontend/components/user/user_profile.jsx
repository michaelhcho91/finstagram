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
                <Link to={"/profile"}>
                  <img src={"https://instagram.fist4-1.fna.fbcdn.net/vp/73635c4dfa64bcdde42f5c2ec53639b4/5CDDD9F1/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=instagram.fist4-1.fna.fbcdn.net"}/>
                </Link>
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