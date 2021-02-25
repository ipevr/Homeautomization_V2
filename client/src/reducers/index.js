import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import plugReducer from "./plugReducer";
import categoryReducer from "./categoryReducer";

export default combineReducers({
  plugs: plugReducer,
  categories: categoryReducer,
  form: formReducer,
});
