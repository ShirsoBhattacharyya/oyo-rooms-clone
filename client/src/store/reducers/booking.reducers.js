import {
  BOOKING_GET_FAILURE,
  BOOKING_GET_LOADING,
  BOOKING_GET_SUCCESS,
  BOOKING_POST_FAILURE,
  BOOKING_POST_LOADING,
  BOOKING_POST_SUCCESS,
  TEMPORARY_BOOKING_GET_FAILURE,
  TEMPORARY_BOOKING_GET_LOADING,
  TEMPORARY_BOOKING_GET_SUCCESS,
  TEMPORARY_BOOKING_POST_FAILURE,
  TEMPORARY_BOOKING_POST_LOADING,
  TEMPORARY_BOOKING_POST_SUCCESS,
} from "../types";

const initialState = {
  data: [],
  tempdata: [],
  loading: false,
  error: false,
};

export const bookingReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case BOOKING_GET_LOADING: {
      return { ...state, loading: true };
    }
    case BOOKING_GET_SUCCESS: {
      return { ...state, loading: false, data: payload };
    }
    case BOOKING_GET_FAILURE: {
      return { ...state, loading: false, error: true };
    }
    case BOOKING_POST_LOADING: {
      return { ...state, loading: true };
    }
    case BOOKING_POST_SUCCESS: {
      return { ...state, loading: false, data: payload };
    }
    case BOOKING_POST_FAILURE: {
      return { ...state, loading: false, error: true };
    }
    case TEMPORARY_BOOKING_GET_LOADING: {
      return { ...state, loading: true };
    }
    case TEMPORARY_BOOKING_GET_SUCCESS: {
      return { ...state, loading: false, tempdata: payload };
    }
    case TEMPORARY_BOOKING_GET_FAILURE: {
      return { ...state, loading: false, error: true };
    }
    case TEMPORARY_BOOKING_POST_LOADING: {
      return { ...state, loading: true };
    }
    case TEMPORARY_BOOKING_POST_SUCCESS: {
      return { ...state, loading: false, tempdata: payload };
    }
    case TEMPORARY_BOOKING_POST_FAILURE: {
      return { ...state, loading: false, error: true };
    }
    default: {
      return state;
    }
  }
};
