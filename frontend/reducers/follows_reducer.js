import { merge } from "lodash";
import { RECEIVE_FOLLOWS, RECEIVE_FOLLOW, REMOVE_FOLLOW } from "../actions/follow_actions";

const followsReducer = (oldState = {}, action) => {
  Object.freeze(oldState);

  switch (action.type) {
    case RECEIVE_FOLLOWS:
      return merge(
        {},
        oldState,
        action.follows
      );
    
    case RECEIVE_FOLLOW:
      return merge(
        {},
        oldState,
        { [action.follow.following_id]: action.follow }
      );

    case REMOVE_FOLLOW:
      let newState = merge(
        {},
        oldState
      );
      delete newState[action.follow.following_id];
      return newState;
      
    default:
      return oldState;
  }
};

export default followsReducer;