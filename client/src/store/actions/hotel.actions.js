import axios from "axios";
import {
  HOTEL_GET_LOADING,
  HOTEL_GET_SUCCESS,
  HOTEL_GET_FAILURE,
  HOTEL_POST_LOADING,
  HOTEL_POST_SUCCESS,
  HOTEL_POST_FAILURE,
} from "../types";
import { OYO_URL } from "../../constants";

export const getHotelsFilter = (filter) => async (dispatch) => {
  dispatch({ type: HOTEL_GET_LOADING });
  try {
    const res = await axios.post(`${OYO_URL}/hotels`, filter);
    dispatch({ type: HOTEL_GET_SUCCESS, payload: res.data.data });
    return res;
  } catch (e) {
    dispatch({ type: HOTEL_GET_FAILURE });
    return Promise.reject(e);
  }
};

export const getHotelById = (id) => async (dispatch) => {
  dispatch({ type: HOTEL_GET_LOADING });
  try {
    const res = await axios.get(`${OYO_URL}/hotels/${id}`);
    dispatch({ type: HOTEL_GET_SUCCESS, payload: res.data.data });
    return res;
  } catch (e) {
    dispatch({ type: HOTEL_GET_FAILURE });
    return Promise.reject(e);
  }
};

export const createHotel = (hotel) => async (dispatch) => {
  dispatch({ type: HOTEL_POST_LOADING });
  try {
    const res = await axios.post(`${OYO_URL}/hotels/new`, hotel);
    dispatch({ type: HOTEL_POST_SUCCESS, payload: res.data });
    return res;
  } catch (e) {
    dispatch({ type: HOTEL_POST_FAILURE });
    return Promise.reject(e);
  }
};
