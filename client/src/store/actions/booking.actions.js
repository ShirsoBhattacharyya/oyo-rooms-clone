import axios from "axios";
import {
  BOOKING_GET_LOADING,
  BOOKING_GET_SUCCESS,
  BOOKING_GET_FAILURE,
  BOOKING_POST_LOADING,
  BOOKING_POST_SUCCESS,
  BOOKING_POST_FAILURE,
  TEMPORARY_BOOKING_GET_LOADING,
  TEMPORARY_BOOKING_GET_SUCCESS,
  TEMPORARY_BOOKING_GET_FAILURE,
  TEMPORARY_BOOKING_POST_LOADING,
  TEMPORARY_BOOKING_POST_SUCCESS,
  TEMPORARY_BOOKING_POST_FAILURE,
} from "../types";
import { OYO_URL } from "../../constants";

export const getBookingsFilter = (filter) => async (dispatch) => {
  dispatch({ type: BOOKING_GET_LOADING });
  try {
    const res = await axios.post(`${OYO_URL}/bookings`, filter);
    dispatch({ type: BOOKING_GET_SUCCESS, payload: res.data.data });
    return res;
  } catch (e) {
    dispatch({ type: BOOKING_GET_FAILURE });
    return Promise.reject(e);
  }
};

export const getBookingById = (id) => async (dispatch) => {
  dispatch({ type: BOOKING_GET_LOADING });
  try {
    const res = await axios.get(`${OYO_URL}/bookings/${id}`);
    dispatch({ type: BOOKING_GET_SUCCESS, payload: res.data.data });
    return res;
  } catch (e) {
    dispatch({ type: BOOKING_GET_FAILURE });
    return Promise.reject(e);
  }
};

export const createBooking = (booking) => async (dispatch) => {
  dispatch({ type: BOOKING_POST_LOADING });
  try {
    const res = await axios.post(`${OYO_URL}/bookings/new`, booking);
    dispatch({ type: BOOKING_POST_SUCCESS, payload: res.data.data });
    return res;
  } catch (e) {
    dispatch({ type: BOOKING_POST_FAILURE });
    return Promise.reject(e);
  }
};

export const getTemporaryBookingsFilter = (filter) => async (dispatch) => {
  dispatch({ type: TEMPORARY_BOOKING_GET_LOADING });
  try {
    const res = await axios.post(`${OYO_URL}/temporary-bookings`, filter);
    dispatch({ type: TEMPORARY_BOOKING_GET_SUCCESS, payload: res.data.data });
    return res;
  } catch (e) {
    dispatch({ type: TEMPORARY_BOOKING_GET_FAILURE });
    return Promise.reject(e);
  }
};

export const getTemporaryBookingById = (id) => async (dispatch) => {
  dispatch({ type: TEMPORARY_BOOKING_GET_LOADING });
  try {
    const res = await axios.get(`${OYO_URL}/temporary-bookings/${id}`);
    dispatch({ type: TEMPORARY_BOOKING_GET_SUCCESS, payload: res.data.data });
    return res;
  } catch (e) {
    dispatch({ type: TEMPORARY_BOOKING_GET_FAILURE });
    return Promise.reject(e);
  }
};

export const createTemporaryBooking = (booking) => async (dispatch) => {
  dispatch({ type: TEMPORARY_BOOKING_POST_LOADING });
  try {
    console.log("inside action");
    const res = await axios.post(`${OYO_URL}/temporary-bookings/new`, booking);
    dispatch({ type: TEMPORARY_BOOKING_POST_SUCCESS, payload: res.data.data });
    return res;
  } catch (e) {
    dispatch({ type: TEMPORARY_BOOKING_POST_FAILURE });
    return Promise.reject(e);
  }
};
