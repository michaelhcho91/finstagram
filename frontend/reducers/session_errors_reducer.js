import { merge } from "lodash";
import { RECEIVE_CURRENT_USER, RECEIVE_ERRORS, CLEAR_ERRORS } from "../actions/session_actions";

const sessionErrorsReducer = (oldState = [], action) => {
  Object.freeze(oldState);
  let newState = merge(
    [],
    oldState
  );

  switch (action.type) {
    case RECEIVE_ERRORS:
      newState = action.errors.responseJSON;
      return newState;

    case CLEAR_ERRORS:
    case RECEIVE_CURRENT_USER:
      newState = [];
      return newState;
      
    default:
      return oldState;
  }
};

export default sessionErrorsReducer;