import { OPEN_EDITTING, CLOSE_EDITTING } from "../actions/post_actions";

const captionEdittingReducer = (oldState = null, action) => {
  Object.freeze(oldState);

  switch (action.type) {
    case OPEN_EDITTING:
      return action.postId;
    case CLOSE_EDITTING:
      return null;
    default:
      return oldState;
  }
};

export default captionEdittingReducer;