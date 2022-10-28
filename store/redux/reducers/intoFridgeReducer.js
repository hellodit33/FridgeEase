import { FETCH_FOOD, ADD_FOOD_TO_FRIDGE } from "../actions/fridge.actions";

const initialState = {};

export default function intoFridgeReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_FOOD: {
      return action.payload;
    }
    case ADD_FOOD_TO_FRIDGE:
      return {
        ...state,
        foodInFridge: [action.payload.foodIdToAdd, ...state.foodInFridge],
      };

    default:
      return state;
  }
}
