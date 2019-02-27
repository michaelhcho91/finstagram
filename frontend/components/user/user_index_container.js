import { connect } from "react-redux";
import UserIndex from "./user_index";

const mapStateToProps = (state) => {
  return {
    currentUser: state.entities.users[state.session.id],
    users: Object.values(state.entities.users).sort()
  };
};

export default connect(mapStateToProps, null)(UserIndex);