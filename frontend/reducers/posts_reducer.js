import { merge } from "lodash";
import { RECEIVE_POSTS, REMOVE_POST, RECEIVE_POST } from "../actions/post_actions";

const postsReducer = (oldState = {}, action) => {
  Object.freeze(oldState);

  switch (action.type) {
    case RECEIVE_POSTS:
      return merge({}, oldState, action.posts);
    case RECEIVE_POST:
      return merge({}, oldState, { [action.post.id]: action.post });
    case REMOVE_POST:
      let newState = merge({}, oldState);
      delete newState[action.postId];
      return newState;
    default:
      return oldState;
  }
};

export default postsReducer;