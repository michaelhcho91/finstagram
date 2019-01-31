import { connect } from "react-redux";
import PostIndex from "./post_index";
import { fetchPosts, deletePost, openEditting, closeEditting } from "../../actions/post_actions";
import { fetchUsers } from "../../actions/user_actions";
import { fetchLikes, createLike, deleteLike } from "../../actions/like_actions";
import { fetchComments, createComment, deleteComment } from "../../actions/comment_actions";

const mapStateToProps = (state) => {
  return {
    posts: Object.values(state.entities.posts).reverse(),
    users: state.entities.users,
    likes: Object.values(state.entities.likes),
    comments: Object.values(state.entities.comments),
    currentUser: state.entities.users[state.session.id],
    captionEditting: state.ui.captionEditting
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    fetchPosts: () => dispatch(fetchPosts()),
    deletePost: (postId) => dispatch(deletePost(postId)),
    openEditting: (postId) => dispatch(openEditting(postId)),
    closeEditting: () => dispatch(closeEditting()),
    fetchLikes: () => dispatch(fetchLikes()),
    createLike: (like) => dispatch(createLike(like)),
    deleteLike: (likeId) => dispatch(deleteLike(likeId)),
    fetchComments: () => dispatch(fetchComments()),
    createComment: (comment) => dispatch(createComment(comment)),
    deleteComment: (commentId) => dispatch(deleteComment(commentId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostIndex);