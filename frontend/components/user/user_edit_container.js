import { connect } from "react-redux";
import UserEdit from "./user_edit";
import { updateUser } from "../../actions/user_actions";

const mapStateToProps = (state) => {
  return {
    currentUser: state.entities.users[stat.session.id]
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => dispatch(updateUser(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit);