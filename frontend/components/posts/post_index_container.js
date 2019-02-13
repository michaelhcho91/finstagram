import { connect } from "react-redux";
import PostIndex from "./post_index";
import { fetchPosts } from "../../actions/post_actions";
import { fetchUsers } from "../../actions/user_actions";
import { fetchComments } from "../../actions/comment_actions";
import { closeModal } from "../../actions/modal_actions";

const mapStateToProps = (state) => {
  return {
    posts: Object.values(state.entities.posts).reverse(),
    users: state.entities.users,
    comments: Object.values(state.entities.comments),
    currentUser: state.entities.users[state.session.id]
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    fetchComments: () => dispatch(fetchComments()),
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostIndex);