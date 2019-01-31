import { merge } from "lodash";
import { RECEIVE_LIKES, RECEIVE_LIKE, REMOVE_LIKE } from "../actions/like_actions";

const likesReducer = (oldState = {}, action) => {
  Object.freeze(oldState);

  switch (action.type) {
    case RECEIVE_LIKES:
      return merge(
        {},
        oldState,
        action.likes
      );
    
    case RECEIVE_LIKE:
      return merge(
        {},
        oldState,
        { [action.like.id]: action.like }
      );

    case REMOVE_LIKE:
      let newState = merge({}, oldState);
      delete newState[action.like.id];
      return newState;

    default:
      return oldState;
  }
};

export default likesReducer;