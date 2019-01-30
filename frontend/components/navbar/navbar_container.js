import { connect } from "react-redux";
import Navbar from "./navbar";
import { openModal, closeModal } from "../../actions/modal_actions";

const mapStateToProps = (state) => {
  return {
    modal: state.ui.modal
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openModal: (type, options) => dispatch(openModal(type, options)),
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);