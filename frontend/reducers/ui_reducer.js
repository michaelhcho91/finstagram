import { combineReducers } from "redux";
import modalReducer from "./modal_reducer";
import captionEdittingReducer from "./caption_editting_reducer";

const uiReducer = combineReducers({
  modal: modalReducer,
  captionEditting: captionEdittingReducer
});

export default uiReducer;