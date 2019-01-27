import { connect } from "react-redux";
import UserProfile from "./user_profile";
import { fetchPosts } from "../../actions/post_actions";
import { logout } from "../../actions/session_actions";

const mapStateToProps = (state) => {
  return {
    currentUser: state.entities.users[state.session.id],
    posts: state.posts
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    logout: () => dispatch(logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);