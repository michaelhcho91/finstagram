import { combineReducers } from "redux";
import usersReducer from "./users_reducer";
import postsReducer from "./posts_reducer";
import followsReducer from "./follows_reducer";

const entitiesReducer = combineReducers({
  users: usersReducer,
  posts: postsReducer,
  follows: followsReducer
});

export default entitiesReducer;