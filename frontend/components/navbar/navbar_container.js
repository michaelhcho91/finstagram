import { connect } from "react-redux";
import Navbar from "./navbar";
import { fetchUsers } from "../../actions/user_actions";

const mapStateToProps = (state) => {
  return {
    users: Object.values(state.entities.users)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);