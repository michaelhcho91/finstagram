import { merge } from "lodash";
import { RECEIVE_CURRENT_USER } from "../actions/session_actions";
import { RECEIVE_USERS, RECEIVE_USER } from "../actions/user_actions";

const usersReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  
  switch (action.type) {
    case RECEIVE_USER:
    case RECEIVE_CURRENT_USER:
      return merge(
        {},
        oldState,
        { [action.user.id]: action.user }
      );

    case RECEIVE_USERS:
      return merge(
        {},
        oldState,
        action.users
      );

    default:
      return oldState;
  }
};

export default usersReducer;