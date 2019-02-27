import { connect } from "react-redux";
import UserProfile from "./user_profile";
import { fetchPosts } from "../../actions/post_actions";
import { logout } from "../../actions/session_actions";
import { fetchUser } from "../../actions/user_actions";
import { openModal } from "../../actions/modal_actions";
import { fetchComments } from "../../actions/comment_actions";
import { createFollow, deleteFollow } from "../../actions/follow_actions";

const mapStateToProps = (state, ownProps) => {
  return {
    captionEditting: state.ui.captionEditting,
    comments: Object.values(state.entities.comments),
    currentUser: state.entities.users[state.session.id],
    posts: Object.values(state.entities.posts).reverse(),
    user: state.entities.users[ownProps.match.params.userId]
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createFollow: (follow) => dispatch(createFollow(follow)),
    deleteFollow: (followingId) => dispatch(deleteFollow(followingId)),
    fetchComments: () => dispatch(fetchComments()),
    fetchPosts: () => dispatch(fetchPosts()),
    fetchUser: (userId) => dispatch(fetchUser(userId)),
    logout: () => dispatch(logout()),
    openModal: (type, options) => dispatch(openModal(type, options))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);