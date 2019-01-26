import { combineReducers } from "redux";
import sessionErrorsReducer from "./session_errors_reducer";
import postsErrorsReducer from "./posts_errors_reducer";

const errorsReducer = combineReducers({
  session: sessionErrorsReducer,
  posts: postsErrorsReducer
});

export default errorsReducer;