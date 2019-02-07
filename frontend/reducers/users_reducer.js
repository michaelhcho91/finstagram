import { merge } from "lodash";
import { RECEIVE_CURRENT_USER } from "../actions/session_actions";
import { RECEIVE_USERS, RECEIVE_USER } from "../actions/user_actions";
import { RECEIVE_FOLLOW, REMOVE_FOLLOW } from "../actions/follow_actions";

const usersReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  let newState = merge(
    {},
    oldState
  );
  
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
    case RECEIVE_USER:
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

    case RECEIVE_FOLLOW:
      newState[action.follow.follower_id].followingIds.push(action.follow.id);
      return newState;

    case REMOVE_FOLLOW:
      newState[action.follow.follower_id].followerIds =
        newState[action.follow.follower_id].followerIds.filter(id => id !== action.follow.follower_id);
      return newState;
    
    default:
      return oldState;
  }
};

export default usersReducer;