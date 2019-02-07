import { connect } from "react-redux";
import UserProfile from "./user_profile";
import { fetchPosts } from "../../actions/post_actions";
import { logout } from "../../actions/session_actions";
import { fetchUsers, fetchUser, updateUser } from "../../actions/user_actions";
import { openModal, closeModal } from "../../actions/modal_actions";
import { fetchComments } from "../../actions/comment_actions";
import { createFollow, deleteFollow } from "../../actions/follow_actions";

const mapStateToProps = (state, ownProps) => {
  return {
    posts: Object.values(state.entities.posts).reverse(),
    comments: Object.values(state.entities.comments),
    currentUser: state.entities.users[state.session.id],
    user: state.entities.users[ownProps.match.params.userId],
    captionEditting: state.ui.captionEditting
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    fetchUser: (userId) => dispatch(fetchUser(userId)),
    fetchUsers: () => dispatch(fetchUsers()),
    fetchComments: () => dispatch(fetchComments()),
    logout: () => dispatch(logout()),
    updateUser: (user) => dispatch(updateUser(user)),
    openModal: (type, options) => dispatch(openModal(type, options)),
    closeModal: () => dispatch(closeModal()),
    createFollow: (follow) => dispatch(createFollow(follow)),
    deleteFollow: (followingId) => dispatch(deleteFollow(followingId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);