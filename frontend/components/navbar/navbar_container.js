import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Navbar from "./navbar";
import { fetchUsers } from "../../actions/user_actions";

const mapStateToProps = (state) => {
  return {
    currentUser: state.entities.users[state.session.id],
    users: Object.values(state.entities.users)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));