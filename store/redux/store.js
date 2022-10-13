import { configureStore } from "@reduxjs/toolkit";
import toReadReducer from "./toread.js";

export const store = configureStore({
  reducer: {
    toReads: toReadReducer,
  },
});
