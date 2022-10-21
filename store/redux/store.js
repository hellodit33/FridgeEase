import { configureStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import toReadReducer from "./reducers/toread.js";
import intoFridgeReducer from "./reducers/intoFridgeReducer.js";
export const rootReducer = combineReducers({
  toRead: toReadReducer,
  intoFridge: intoFridgeReducer,
});
