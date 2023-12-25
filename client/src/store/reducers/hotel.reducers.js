import {
  HOTEL_GET_LOADING,
  HOTEL_GET_SUCCESS,
  HOTEL_GET_FAILURE,
  HOTEL_POST_LOADING,
  HOTEL_POST_SUCCESS,
  HOTEL_POST_FAILURE,
} from "../types";

const initialState = {
  data: [],
  loading: false,
  error: false,
};

export const hotelReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HOTEL_GET_LOADING: {
      return { ...state, loading: true };
    }
    case HOTEL_GET_SUCCESS: {
      console.log({payload});
      return { ...state, loading: false, data: payload };
    }
    case HOTEL_GET_FAILURE: {
      return { ...state, loading: false, error: true };
    }
    case HOTEL_POST_LOADING: {
      return { ...state, loading: true };
    }
    case HOTEL_POST_SUCCESS: {
      return { ...state, loading: false, data: payload };
    }
    case HOTEL_POST_FAILURE: {
      return { ...state, loading: false, error: true };
    }
    default: {
      return state;
    }
  }
};
