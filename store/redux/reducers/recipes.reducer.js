import { FETCH_RECIPES } from "../actions/recipe.actions";

const initialState = {};

export default function recipesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_RECIPES: {
      return action.payload;
    }

    default:
      return state;
  }
}
