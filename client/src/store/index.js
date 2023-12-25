import {
  legacy_createStore,
  applyMiddleware,
  combineReducers,
  compose,
} from "redux";
import { thunk } from "redux-thunk";
import { bookingReducer, hotelReducer, userReducer } from "./reducers";

const rootReducer = combineReducers({
  user: userReducer,
  hotels: hotelReducer,
  bookings: bookingReducer,
});

const createComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = legacy_createStore(
  rootReducer,
  createComposer(applyMiddleware(thunk))
);
