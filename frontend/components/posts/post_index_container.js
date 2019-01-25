import { connect } from "react-redux";
import PostIndex from "./post_index";
import { fetchPosts } from "../../actions/post_actions";
import { logout } from "../../actions/session_actions";
import { fetchUsers } from "../../actions/user_actions";

const mapStateToProps = (state, ownProps) => {
  return {
    posts: Object.values(state.entities.posts),
    users: Object.values(state.entities.users)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    logout: () => dispatch(logout()),
    fetchUsers: () => dispatch(fetchUsers())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostIndex);