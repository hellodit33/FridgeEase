import { GET_USER, GET_USER_FOOD } from "../actions/user.actions";

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload;

    case GET_USER_FOOD:
      return action.payload;

    default:
      return state;
  }
}
