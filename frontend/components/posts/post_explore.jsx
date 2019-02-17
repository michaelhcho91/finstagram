import React from "react";
import { connect } from "react-redux";
import { fetchPosts } from "../../actions/post_actions";
import { fetchComments } from "../../actions/comment_actions";
import { closeModal } from "../../actions/modal_actions";
import PostIndexItemContainer from "./post_index_item_container";
import NavbarContainer from "../navbar/navbar_container";

class PostExplore extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {
      fetchPosts,
      fetchComments,
      closeModal
    } = this.props;

    closeModal();
    fetchPosts();
    fetchComments();
  }
  
  render() {
    const {
      users,
      posts,
      comments,
      currentUser
    } = this.props;

    let explorePosts = posts.filter(post => !currentUser.followingIds.includes(post.posterId) && currentUser.id !== post.posterId).map( (post, idx) => {
      if (users[post.posterId]) {
        const postComments = comments.filter(comment => post.commentIds.includes(comment.id));

        return <PostIndexItemContainer key={idx}
                                       post={post}
                                       user={users[post.posterId]}
                                       postComments={postComments}
                                       currentUser={currentUser} />
      }
    });

    if (explorePosts.length === 0) {
      explorePosts = <article className="temp-explore-container" />
    }
    
    return (
      <>
        <NavbarContainer />
      
        <section className="explore-container">
          <h2 className="explore-text">
            Explore
          </h2>

          <ul className="posts-list">
            {explorePosts}
          </ul>
        </section>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    posts: Object.values(state.entities.posts).reverse(),
    users: state.entities.users,
    comments: Object.values(state.entities.comments),
    currentUser: state.entities.users[state.session.id]
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    fetchComments: () => dispatch(fetchComments()),
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostExplore);