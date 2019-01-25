import { connect } from "react-redux";
import Navbar from "./navbar";
import { openModal, closeModal } from "../../actions/modal_actions";

const mapStateToProps = (state, ownProps) => {
  return {
    modal: state.ui.modal
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    openModal: (modal) => dispatch(openModal("create")),
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);