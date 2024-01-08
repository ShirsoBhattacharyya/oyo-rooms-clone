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
  status: null,
  loading: false,
  success: false,
  error: false,
  user: JSON.parse(localStorage?.getItem("user")) || null,
  edit: false,
  message: null,
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_REGISTER_LOADING: {
      return {
        ...state,
        status: null,
        loading: true,
        success: false,
        error: false,
      };
    }
    case USER_REGISTER_SUCCESS: {
      return {
        ...state,
        status: payload?.status,
        loading: false,
        success: true,
        error: false,
        message: payload?.message,
      };
    }
    case USER_REGISTER_FAILURE: {
      return {
        ...state,
        status: payload?.status,
        loading: false,
        success: false,
        error: true,
        message: payload?.message,
      };
    }
    case USER_LOGIN_LOADING: {
      return {
        ...state,
        status: null,
        loading: true,
        success: false,
        error: false,
      };
    }
    case USER_LOGIN_SUCCESS: {
      localStorage?.setItem("user", JSON.stringify(payload?.data));
      return {
        ...state,
        status: payload?.status,
        loading: false,
        success: true,
        error: false,
        user: payload?.data,
        message: payload?.message,
      };
    }
    case USER_LOGIN_FAILURE: {
      return {
        ...state,
        status: payload?.status,
        loading: false,
        success: false,
        error: true,
        message: payload?.message,
      };
    }
    case USER_LOGOUT_LOADING: {
      return { ...state, loading: true, success: false, error: true };
    }
    case USER_LOGOUT_SUCCESS: {
      localStorage?.removeItem("user");
      return {
        ...state,
        status: 200,
        loading: false,
        success: true,
        error: false,
        user: null,
        message: "Logged out Successfully.",
      };
    }
    case USER_LOGOUT_FAILURE: {
      return {
        ...state,
        status: 500,
        loading: false,
        success: false,
        error: true,
        message: "Something went wrong.",
      };
    }
    case USER_GET_LOADING: {
      return { ...state, loading: true, success: false, error: true };
    }
    case USER_GET_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: true,
        error: false,
        user: { ...state?.user, existingUser: payload?.data },
        message: payload?.message,
      };
    }
    case USER_GET_FAILURE: {
      return {
        ...state,
        loading: false,
        success: false,
        error: true,
        message: payload?.message,
      };
    }
    case USER_UPDATE_LOADING: {
      return { ...state, loading: true, success: false, error: false };
    }
    case USER_UPDATE_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: false,
        error: false,
        user: { ...state?.user, existingUser: payload?.data },
        message: payload?.message,
        edit: true,
      };
    }
    case USER_UPDATE_FAILURE: {
      return {
        ...state,
        loading: false,
        success: false,
        error: true,
        message: payload?.message,
      };
    }
    case USER_DELETE_LOADING: {
      return { ...state, loading: true };
    }
    case USER_DELETE_SUCCESS: {
      localStorage?.removeItem("user");
      return { ...state, loading: false, user: null };
    }
    case USER_DELETE_FAILURE: {
      return {
        ...state,
        loading: false,
        success: false,
        error: true,
        message: payload?.message,
      };
    }
    default: {
      return state;
    }
  }
};
