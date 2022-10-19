import { FETCH_FOOD } from "../actions/fridgeActions";

const initialState = {
  food: [],
  addToFridge: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_FOOD:
      return { ...state, food: action.payload };
  }
  return state;
}
