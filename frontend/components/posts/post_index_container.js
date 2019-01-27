import { connect } from "react-redux";
import PostIndex from "./post_index";
import { fetchPosts, deletePost } from "../../actions/post_actions";
import { fetchUsers } from "../../actions/user_actions";
// import { createComment } from "../../actions/comment_actions";

const mapStateToProps = (state) => {
  return {
    posts: Object.values(state.entities.posts),
    users: Object.values(state.entities.users)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    fetchUsers: () => dispatch(fetchUsers())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostIndex);