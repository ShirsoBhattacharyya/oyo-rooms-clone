import {
  USER_REGISTER_LOADING,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,
  USER_LOGIN_LOADING,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGOUT_LOADING,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAILURE,
  USER_GET_LOADING,
  USER_GET_SUCCESS,
  USER_GET_FAILURE,
  USER_UPDATE_LOADING,
  USER_UPDATE_FAILURE,
  USER_UPDATE_SUCCESS,
  USER_DELETE_LOADING,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAILURE,
} from "../types";
import axios from "axios";
import { OYO_URL } from "../../constants";

export const registerUser = (user) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_LOADING });
  try {
    const res = await axios.post(`${OYO_URL}/auth/register`, user);
    console.log(res.data.message);
    dispatch({ type: USER_REGISTER_SUCCESS, payload: res.data.message });
    return res;
  } catch (e) {
    dispatch({ type: USER_REGISTER_FAILURE });
    return Promise.reject(e);
  }
};

export const loginUser = (user) => async (dispatch) => {
  dispatch({ type: USER_LOGIN_LOADING });
  try {
    const res = await axios.post(`${OYO_URL}/auth/login`, user);
    dispatch({ type: USER_LOGIN_SUCCESS, payload: res.data });
    return res;
  } catch (e) {
    dispatch({ type: USER_LOGIN_FAILURE });
    return Promise.reject(e);
  }
};

export const logoutUser = () => async (dispatch) => {
  dispatch({ type: USER_LOGOUT_LOADING });
  try {
    dispatch({ type: USER_LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: USER_LOGOUT_FAILURE });
  }
};

export const getUser = (token) => async (dispatch) => {
  dispatch({ type: USER_GET_LOADING });
  try {
    const res = await axios.get(`${OYO_URL}/auth/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: USER_GET_SUCCESS, payload: res.data });
    return res;
  } catch (e) {
    dispatch({ type: USER_GET_FAILURE });
    return Promise.reject(e);
  }
};

export const updateUser =
  (id, updatedUser, filterType = "") =>
  async (dispatch) => {
    dispatch({ type: USER_UPDATE_LOADING });
    try {
      const res = await axios.put(
        `${OYO_URL}/auth/user/${id}?filterType=${filterType}`,
        updatedUser,
      );
      dispatch({ type: USER_UPDATE_SUCCESS, payload: res.data });
      return res;
    } catch (e) {
      dispatch({ type: USER_UPDATE_FAILURE });
      return Promise.reject(e);
    }
  };

export const deleteUser = (id) => async (dispatch) => {
  dispatch({ type: USER_DELETE_LOADING });
  try {
    const res = await axios.delete(`${OYO_URL}/user/${id}`);
    dispatch({ type: USER_DELETE_SUCCESS });
    return res;
  } catch (e) {
    dispatch({ type: USER_DELETE_FAILURE });
    return Promise.reject(e);
  }
};
