import { connect } from "react-redux";
import PostIndex from "./post_index";
import { fetchPosts, deletePost, openEditting, closeEditting } from "../../actions/post_actions";
import { fetchUsers } from "../../actions/user_actions";
import { createComment, deleteComment } from "../../actions/comment_actions";
import { withRouter } from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    posts: Object.values(state.entities.posts).reverse(),
    users: state.entities.users,
    currentUser: state.entities.users[state.session.id],
    captionEditting: state.ui.captionEditting
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    fetchUsers: () => dispatch(fetchUsers()),
    createComment: (comment) => dispatch(createComment(comment)),
    deletePost: (postId) => dispatch(deletePost(postId)),
    deleteComment: (commentId) => dispatch(deleteComment(commentId)),
    openEditting: (postId) => dispatch(openEditting(postId)),
    closeEditting: () => dispatch(closeEditting())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostIndex));