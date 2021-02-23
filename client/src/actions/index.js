import plugs from "../apis/plugs";
import {
  CREATE_PLUG,
  FETCH_PLUG,
  FETCH_PLUGS,
  EDIT_PLUG,
  DELETE_PLUG,
} from "./types";
import history from "../history";

export const createPlug = (formValues) => async (dispatch) => {
  const response = await plugs.post("/plugs", { ...formValues });

  dispatch({ type: CREATE_PLUG, payload: response.data });
  history.push("/plugs");
};

export const fetchPlug = (id) => async (dispatch) => {
  const response = await plugs.get(`/plugs/${id}`);

  dispatch({ type: FETCH_PLUG, payload: response.data });
};

export const fetchPlugs = () => async (dispatch) => {
  const response = await plugs.get("/plugs");

  dispatch({ type: FETCH_PLUGS, payload: response.data });
};

export const editPlug = (id, formValues) => async (dispatch) => {
  const response = await plugs.patch(`/plugs/${id}`, { ...formValues });

  dispatch({ type: EDIT_PLUG, payload: response.data });
  history.push("/plugs/modify");
};

export const deletePlug = (id) => async (dispatch) => {
  await plugs.delete(`/plugs/${id}`);

  dispatch({ type: DELETE_PLUG, payload: id });
  history.push("/plugs/modify");
};
