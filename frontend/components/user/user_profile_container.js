import { connect } from "react-redux";
import UserProfile from "./user_profile";
import { fetchPosts } from "../../actions/post_actions";
import { logout } from "../../actions/session_actions";
import { updateUser } from "../../actions/user_actions";
import { openModal, closeModal } from "../../actions/modal_actions";
import { fetchLikes } from "../../actions/like_actions";
import { fetchComments } from "../../actions/comment_actions";

const mapStateToProps = (state) => {
  return {
    currentUser: state.entities.users[state.session.id],
    posts: Object.values(state.entities.posts).reverse(),
    captionEditting: state.ui.captionEditting,
    likes: Object.values(state.entities.likes),
    comments: Object.values(state.entities.comments)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    logout: () => dispatch(logout()),
    updateUser: (user) => dispatch(updateUser(user)),
    openModal: (type, options) => dispatch(openModal(type, options)),
    closeModal: () => dispatch(closeModal()),
    fetchLikes: () => dispatch(fetchLikes()),
    fetchComments: () => dispatch(fetchComments())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);