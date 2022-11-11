import {
  FETCH_FOOD,
  ADD_FOOD_TO_FRIDGE,
  REMOVE_FOOD_FROM_FRIDGE,
} from "../actions/fridge.actions";

const initialState = {};

export default function intoFridgeReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_FOOD: {
      return action.payload;
    }
    case ADD_FOOD_TO_FRIDGE:
      return {
        ...state,
        usersfood: [action.payload.foodIdToAdd, ...state.usersfood],
      };
    case REMOVE_FOOD_FROM_FRIDGE:
      return {
        ...state,

        usersfood: state.usersfood.filter(
          (id) => id !== action.payload.foodIdToFollow
        ),
      };
    default:
      return state;
  }
}
