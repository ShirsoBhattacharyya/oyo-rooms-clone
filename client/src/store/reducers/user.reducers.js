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
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILURE,
  USER_DELETE_LOADING,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAILURE,
} from "../types";

const initialState = {
  loading: false,
  user: JSON.parse(localStorage?.getItem("user")) || null,
  error: false,
  edit: false,
  message: null,
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_REGISTER_LOADING: {
      return { ...state, loading: true, error: false };
    }
    case USER_REGISTER_SUCCESS: {
      return { ...state, loading: false, error: false, message: payload };
    }
    case USER_REGISTER_FAILURE: {
      return { ...state, loading: false, error: true };
    }
    case USER_LOGIN_LOADING: {
      return { ...state, loading: true };
    }
    case USER_LOGIN_SUCCESS: {
      localStorage?.setItem("user", JSON.stringify(payload));
      return { ...state, loading: false, user: payload };
    }
    case USER_LOGIN_FAILURE: {
      return { ...state, loading: false, error: true };
    }
    case USER_LOGOUT_LOADING: {
      return { ...state, loading: true };
    }
    case USER_LOGOUT_SUCCESS: {
      localStorage?.removeItem("user");
      return { ...state, loading: false, user: null };
    }
    case USER_LOGOUT_FAILURE: {
      return { ...state, loading: false, error: true };
    }
    case USER_GET_LOADING: {
      return { ...state, loading: true };
    }
    case USER_GET_SUCCESS: {
      return { ...state, loading: false };
    }
    case USER_GET_FAILURE: {
      return { ...state, loading: false, error: true };
    }
    case USER_UPDATE_LOADING: {
      return { ...state, loading: true };
    }
    case USER_UPDATE_SUCCESS: {
      return { ...state, loading: false, edit: payload };
    }
    case USER_UPDATE_FAILURE: {
      return { ...state, loading: false, error: true };
    }
    case USER_DELETE_LOADING: {
      return { ...state, loading: true };
    }
    case USER_DELETE_SUCCESS: {
      localStorage?.removeItem("user");
      return { ...state, loading: false, user: null };
    }
    case USER_DELETE_FAILURE: {
      return { ...state, loading: false, error: true };
    }
    default: {
      return state;
    }
  }
};
