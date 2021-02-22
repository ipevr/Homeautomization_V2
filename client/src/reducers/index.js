import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import plugReducer from "./plugReducer";

export default combineReducers({
  plugs: plugReducer,
  form: formReducer,
});
