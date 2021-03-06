import React from "react";
import { Redirect } from "react-router-dom";
import PostIndexItemContainer from "./post_index_item_container";
import UserIndexContainer from "../user/user_index_container";
import NavbarContainer from "../navbar/navbar_container";

class PostIndex extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);

    const {
      closeModal,
      fetchComments,
      fetchPosts
    } = this.props;

    closeModal();
    fetchComments();
    fetchPosts();
  }

  render() {
    const {
      comments,
      currentUser,
      posts,
      users
    } = this.props;
    
    let postsList;
    postsList = posts.filter(post => currentUser.followingIds.includes(post.posterId) || currentUser.id === post.posterId).map( (post, idx) => {
      if (users[post.posterId]) {
        const postComments = comments.filter(comment => post.commentIds.includes(comment.id));
        
        return <PostIndexItemContainer key={idx}
                                       post={post}
                                       user={users[post.posterId]}
                                       postComments={postComments} />
      }
    });

    let notFollowing = null;
    let myPosts = posts.filter(post => currentUser.id === post.posterId);
    if (currentUser.followingIds.length === 0 && myPosts.length === 0) {
      notFollowing = <Redirect to={"/explore"} />;
    }
    
    return (
      <>
        <NavbarContainer />
        {notFollowing}

        <section className="post-index-section">
          <div className="posts-list-left">
            <ul className="posts-list">
              {postsList}
            </ul>  
          </div>
          <UserIndexContainer />
        </section>
      </>
    )
  }
}

export default PostIndex;