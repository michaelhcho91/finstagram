import { merge } from "lodash";
import { RECEIVE_FOLLOW, REMOVE_FOLLOW } from "../actions/follow_actions";

const followsReducer = (oldState = {}, action) => {
  Object.freeze(oldState);

  switch (action.type) {
    case RECEIVE_FOLLOW:
      return merge(
        {},
        oldState,
        { [action.follow.follower_id]: action.follow }
      );

    case REMOVE_FOLLOW:
      let newState = merge(
        {},
        oldState
      );
      delete newState[action.followId];
      return newState;
      
    default:
      return oldState;
  }
};

export default followsReducer;