import { connect } from "react-redux";
import PostIndex from "./post_index";
import { fetchPosts, deletePost } from "../../actions/post_actions";
import { fetchUsers } from "../../actions/user_actions";
import { createComment, deleteComment } from "../../actions/comment_actions";

const mapStateToProps = (state) => {
  return {
    posts: Object.values(state.entities.posts).reverse(),
    users: state.entities.users,
    currentUser: state.entities.users[state.session.id]
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    fetchUsers: () => dispatch(fetchUsers()),
    createComment: (comment) => dispatch(createComment(comment)),
    deletePost: (postId) => dispatch(deletePost(postId)),
    deleteComment: (commentId) => dispatch(deleteComment(commentId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostIndex);