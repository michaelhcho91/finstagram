import { connect } from "react-redux";
import Comment from "./comment";
import { deleteComment } from "../../actions/comment_actions";
import { closeModal } from "../../actions/modal_actions";

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.entities.users[state.session.id],
    comment: state.entities.comments[ownProps.commentId]
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteComment: (comment) => dispatch(deleteComment(comment)),
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);