import { merge } from "lodash";
import { RECEIVE_COMMENTS, RECEIVE_COMMENT, REMOVE_COMMENT } from "../actions/comment_actions";

const commentsReducer = (oldState = {}, action) => {
  Object.freeze(oldState);

  switch (action.type) {
    case RECEIVE_COMMENTS:
      return merge(
        {},
        oldState,
        action.comments
      );
      
    case RECEIVE_COMMENT:
      return merge(
        {},
        oldState,
        { [action.comment.id]: action.comment }
      );

    case REMOVE_COMMENT:
      let newState = merge(
        {},
        oldState
      );
      delete newState[action.commentId];
      return newState;

    default:
      return oldState;
  }
};

export default commentsReducer;