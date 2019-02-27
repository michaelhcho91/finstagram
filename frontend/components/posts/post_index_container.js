import { connect } from "react-redux";
import PostIndex from "./post_index";
import { fetchPosts } from "../../actions/post_actions";
import { fetchComments } from "../../actions/comment_actions";
import { closeModal } from "../../actions/modal_actions";

const mapStateToProps = (state) => {
  return {
    comments: Object.values(state.entities.comments),
    currentUser: state.entities.users[state.session.id],
    posts: Object.values(state.entities.posts).reverse(),
    users: state.entities.users
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPosts: () => dispatch(fetchPosts())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostIndex);