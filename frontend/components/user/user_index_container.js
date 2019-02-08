import { connect } from "react-redux";
import UserIndex from "./user_index";
import { fetchUsers } from "../../actions/user_actions";

const mapStateToProps = (state) => {
  return {
    users: Object.values(state.entities.users),
    currentUser: state.entities.users[state.session.id]
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserIndex);