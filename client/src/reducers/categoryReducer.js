import _ from "lodash";
import {
  CREATE_CATEGORY,
  FETCH_CATEGORY,
  FETCH_CATEGORIES,
  EDIT_CATEGORY,
  DELETE_CATEGORY,
} from "../actions/types";

const categoryReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_CATEGORY:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_CATEGORY:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_CATEGORY:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case DELETE_CATEGORY:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};

export default categoryReducer;
