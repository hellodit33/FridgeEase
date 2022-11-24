import {
  FETCH_FOOD,
  ADD_FOOD_TO_FRIDGE,
  REMOVE_FOOD_FROM_FRIDGE,
} from "../actions/fridge.actions";

const initialState = { usersfood: [] };

export default function intoFridgeReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_FOOD: {
      return action.payload;
    }

    case REMOVE_FOOD_FROM_FRIDGE:
      return {
        ...state,
        usersfood: state.usersfood.filter(
          (id) => id !== action.payload.foodIdToRemove
        ),
      };

    default:
      return state;
  }
}
