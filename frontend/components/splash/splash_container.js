import { connect } from "react-redux";
import Splash from "./splash";
import {
  logout,
  login,
  signup,
  clearErrors
} from "../../actions/session_actions";

const mapStateToProps = (state) => {
  return {
    currentUser: state.entities.users[state.session.id],
    errors: state.errors.session,
    formType: "Sign Up"
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearErrors: () => dispatch(clearErrors()),
    logout: () => dispatch(logout()),
    login: (user) => dispatch(login(user)),
    processForm: (user) => dispatch(signup(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Splash);