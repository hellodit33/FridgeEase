import { combineReducers } from "redux";

import intoFridgeReducer from "./intofridge.reducer.js";
import authReducer from "./auth.reducer.js";
import recipesReducer from "./recipes.reducer.js";
import userReducer from "./user.reducer.js";

export default combineReducers({
  authReducer,
  userReducer,
  intoFridgeReducer,
  recipesReducer,
});
