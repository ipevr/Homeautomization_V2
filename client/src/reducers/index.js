import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import plugReducer from "./plugReducer";
import categoryReducer from "./categoryReducer";
import groupReducer from "./groupReducer";

export default combineReducers({
  plugs: plugReducer,
  categories: categoryReducer,
  groups: groupReducer,
  form: formReducer,
});
