import _ from "lodash";
import {
  CREATE_PLUG,
  FETCH_PLUG,
  FETCH_PLUGS,
  EDIT_PLUG,
  DELETE_PLUG,
} from "../actions/types";

const plugReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_PLUGS:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_PLUG:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_PLUG:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_PLUG:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_PLUG:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};

export default plugReducer;
