import { combineReducers } from "redux";

import intoFridgeReducer from "./intoFridgeReducer.js";
import userReducer from "./user.reducer.js";

export default combineReducers({
  userReducer,
  intoFridgeReducer,
});
