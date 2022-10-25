import { FETCH_FOOD } from "../actions/fridge.actions";

const initialState = {};

export default function intoFridgeReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_FOOD:
      return action.payload;

    default:
      return state;
  }
}
