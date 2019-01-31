import { connect } from "react-redux";
import Modal from "./modal";
import { closeModal } from "../../actions/modal_actions";
import { openEditting, closeEditting, deletePost } from "../../actions/post_actions";

const mapStateToProps = (state) => {
  return {
    modal: state.ui.modal,
    captionEditting: state.ui.captionEditting
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
    openEditting: (postId) => dispatch(openEditting(postId)),
    closeEditting: () => dispatch(closeEditting()),
    deletePost: (postId) => dispatch(deletePost(postId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);