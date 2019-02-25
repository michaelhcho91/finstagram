import { connect } from "react-redux";
import UserIndexItem from "./user_index_item";
import { closeModal } from "../../actions/modal_actions";

const mapStateToProps = (state) => {
  return {
    currentUser: state.entities.users[state.session.id]
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserIndexItem);