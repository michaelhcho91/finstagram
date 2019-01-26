import { merge } from "lodash";
import { RECEIVE_POST, RECEIVE_ERRORS, CLEAR_ERRORS } from "../actions/post_actions";

const postsErrorsReducer = (oldState = [], action) => {
  Object.freeze(oldState);
  let newState = merge([], oldState);

  switch (action.type) {
    case RECEIVE_ERRORS:
      newState = action.errors.responseJSON;
      return newState;
    case CLEAR_ERRORS:
    case RECEIVE_POST:
      newState = [];
      return newState;
    default:
      return oldState;
  }
};

export default postsErrorsReducer;