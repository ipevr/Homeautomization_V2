import data from "../apis/data";
import {
  CREATE_PLUG,
  FETCH_PLUG,
  FETCH_PLUGS,
  EDIT_PLUG,
  DELETE_PLUG,
  CREATE_CATEGORY,
  FETCH_CATEGORY,
  FETCH_CATEGORIES,
  EDIT_CATEGORY,
  DELETE_CATEGORY,
  CREATE_GROUP,
  FETCH_GROUP,
  FETCH_GROUPS,
  EDIT_GROUP,
  DELETE_GROUP,
} from "./types";
import history from "../history";

//************************* PLUGS *************************/

export const createPlug = (formValues) => async (dispatch) => {
  const response = await data.post("/plugs", { ...formValues });

  dispatch({ type: CREATE_PLUG, payload: response.data });
  history.push("/plugs");
};

export const fetchPlug = (id) => async (dispatch) => {
  const response = await data.get(`/plug/${id}`);

  dispatch({ type: FETCH_PLUG, payload: response.data });
};

export const fetchPlugs = () => async (dispatch) => {
  const response = await data.get("/plugs");

  dispatch({ type: FETCH_PLUGS, payload: response.data });
};

export const editPlug = (id, formValues) => async (dispatch) => {
  const response = await data.patch(`/plug/${id}`, { ...formValues });

  dispatch({ type: EDIT_PLUG, payload: response.data });
  history.push("/plugs/modify");
};

export const deletePlug = (id) => async (dispatch) => {
  await data.delete(`/plug/${id}`);

  dispatch({ type: DELETE_PLUG, payload: id });
  history.push("/plugs/modify");
};

//************************* CATEGORIES *************************/

export const createCategory = (formValues) => async (dispatch) => {
  const response = await data.post("/categories", { ...formValues });

  dispatch({ type: CREATE_CATEGORY, payload: response.data });
  history.push("/categories/modify");
};

export const fetchCategory = (id) => async (dispatch) => {
  const response = await data.get(`/category/${id}`);

  dispatch({ type: FETCH_CATEGORY, payload: response.data });
};

export const fetchCategories = () => async (dispatch) => {
  const response = await data.get("/categories");

  dispatch({ type: FETCH_CATEGORIES, payload: response.data });
};

export const editCategory = (id, formValues) => async (dispatch) => {
  const response = await data.patch(`/category/${id}`, { ...formValues });

  dispatch({ type: EDIT_CATEGORY, payload: response.data });
  history.push("/categories/modify");
};

export const sortCategory = (id, position) => async (dispatch) => {
  const response = await data.patch(`/category/${id}`, {
    position: position,
  });

  dispatch({ type: EDIT_CATEGORY, payload: response.data });
  history.push("/categories/modify");
};

export const deleteCategory = (id) => async (dispatch) => {
  await data.delete(`/category/${id}`);

  dispatch({ type: DELETE_CATEGORY, payload: id });
  history.push("/categories/modify");
};

//************************* GROUPS *************************/

export const createGroup = (formValues) => async (dispatch) => {
  const response = await data.post("/groups", { ...formValues });

  dispatch({ type: CREATE_GROUP, payload: response.data });
  history.push("/groups/modify");
};

export const fetchGroup = (id) => async (dispatch) => {
  const response = await data.get(`/group/${id}`);

  dispatch({ type: FETCH_GROUP, payload: response.data });
};

export const fetchGroups = () => async (dispatch) => {
  const response = await data.get("/groups");

  dispatch({ type: FETCH_GROUPS, payload: response.data });
};

export const editGroup = (id, formValues) => async (dispatch) => {
  const response = await data.patch(`/group/${id}`, { ...formValues });

  dispatch({ type: EDIT_GROUP, payload: response.data });
  history.push("/groups/modify");
};

export const deleteGroup = (id) => async (dispatch) => {
  await data.delete(`/group/${id}`);

  dispatch({ type: DELETE_GROUP, payload: id });
  history.push("/groups/modify");
};
