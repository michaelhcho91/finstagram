import { connect } from "react-redux";
import PostIndex from "./post_index";
import { fetchPosts, deletePost, openEditting, closeEditting } from "../../actions/post_actions";
import { fetchUsers } from "../../actions/user_actions";
import { fetchLikes, createLike, deleteLike } from "../../actions/like_actions";
import { withRouter } from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    posts: Object.values(state.entities.posts).reverse(),
    users: state.entities.users,
    likes: Object.values(state.entities.likes),
    currentUser: state.entities.users[state.session.id],
    captionEditting: state.ui.captionEditting
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    fetchUsers: () => dispatch(fetchUsers()),
    fetchLikes: () => dispatch(fetchLikes()),
    deletePost: (postId) => dispatch(deletePost(postId)),
    openEditting: (postId) => dispatch(openEditting(postId)),
    closeEditting: () => dispatch(closeEditting()),
    createLike: (like) => dispatch(createLike(like)),
    deleteLike: (likeId) => dispatch(deleteLike(likeId))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostIndex));