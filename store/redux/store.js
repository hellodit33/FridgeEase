import { configureStore } from "@reduxjs/toolkit";
import toReadReducer from "./reducers/toread.js";
import intoFridgeReducer from "./reducers/intoFridgeReducer.js";

export const store = configureStore({
  reducer: {
    intoFridge: intoFridgeReducer,
    toReads: toReadReducer,
  },
});
