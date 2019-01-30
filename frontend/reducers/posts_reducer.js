import { merge } from "lodash";
import { RECEIVE_POSTS, REMOVE_POST, RECEIVE_POST } from "../actions/post_actions";
import { RECEIVE_COMMENT, REMOVE_COMMENT } from "../actions/comment_actions";
import { RECEIVE_LIKE, REMOVE_LIKE } from "../actions/like_actions";

const postsReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  let newState = merge({}, oldState);

  switch (action.type) {
    case RECEIVE_POSTS:
      return merge(
        {},
        oldState,
        action.posts
      );

    case RECEIVE_POST:
      return merge(
        {},
        oldState,
        { [action.post.id]: action.post }
      );

    case REMOVE_POST:
      delete newState[action.postId];
      return newState;
      
    case RECEIVE_COMMENT:
      if (newState[action.comment.post_id].comments) {
        newState[action.comment.post_id].comments[action.comment.id] = action.comment;
      } else {
        newState[action.comment.post_id].comments = {};
        newState[action.comment.post_id].comments[action.comment.id] = action.comment;
      }
      return newState;
      
    case REMOVE_COMMENT:
      delete newState[action.comment.post_id].comments[action.commentId];
      return newState;
      
    case RECEIVE_LIKE:
      newState[action.like.post_id].likerIds.push(action.like.liker_id);
      return newState;
      
    case REMOVE_LIKE:
      newState[action.like.post_id].likerIds = 
        newState[action.like.post_id].likerIds.filter(id => id !== action.like.liker_id);
      return newState;
      
    default:
      return oldState;
  }
};

export default postsReducer;