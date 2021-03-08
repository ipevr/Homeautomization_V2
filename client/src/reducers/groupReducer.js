import _ from "lodash";
import {
  CREATE_GROUP,
  FETCH_GROUP,
  FETCH_GROUPS,
  EDIT_GROUP,
  DELETE_GROUP,
} from "../actions/types";

const groupReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_GROUPS:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_GROUP:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_GROUP:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_GROUP:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case DELETE_GROUP:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};

export default groupReducer;
