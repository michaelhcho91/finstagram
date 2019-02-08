import React from "react";
import { Redirect } from "react-router-dom";
import PostIndexItemContainer from "./post_index_item_container";
import Navbar from "../navbar/navbar";
import NavbarShort from "../navbar/navbar_short";

class PostIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentScrollHeight: null
    };
  }
  
  componentDidMount() {
    window.scrollTo(0, 0);

    const {
      fetchUsers,
      fetchPosts,
      fetchComments
    } = this.props;

    const {
      currentScrollHeight
    } = this.state;
    
    fetchUsers();
    fetchPosts();
    fetchComments();
    
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
  
  render() {
    const {
      currentScrollHeight
    } = this.state;
    
    const {
      posts,
      users,
      comments,
      currentUser
    } = this.props;
    
    let postsList;
    postsList = posts.filter(post => currentUser.followingIds.includes(post.posterId) || currentUser.id === post.posterId).map( (post, idx) => {
      if (users[post.posterId]) {
        const postComments = comments.filter(comment => post.commentIds.includes(comment.id));
        
        return <PostIndexItemContainer key={idx}
                                       post={post}
                                       user={users[post.posterId]}
                                       postComments={postComments}
                                       currentUser={currentUser} />
      }
    });

    let navbar;
    if (currentScrollHeight <= 90) {
      navbar = <Navbar />
    } else {
      navbar = <NavbarShort />
    }

    let notFollowing = null;
    if (!posts && postsList.length === 0) {
      notFollowing = <Redirect to={"/explore"} />;
    }
    
    return (
      <>
        {navbar}
        {notFollowing}

        <section className="post-index-section">
          <div className="posts-list-left">
            <ul className="posts-list">
              {postsList}
            </ul>  
          </div>
          {/* <UserIndexContainer /> */}
        </section>
      </>
    )
  }
}

export default PostIndex;