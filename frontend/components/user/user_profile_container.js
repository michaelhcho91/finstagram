import { connect } from "react-redux";
import UserProfile from "./user_profile";
import { fetchPosts } from "../../actions/post_actions";
import { logout } from "../../actions/session_actions";
import { updateUser } from "../../actions/user_actions";

const mapStateToProps = (state) => {
  return {
    currentUser: state.entities.users[state.session.id],
    posts: Object.values(state.entities.posts)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    logout: () => dispatch(logout()),
    updateUser: (user) => dispatch(updateUser(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);