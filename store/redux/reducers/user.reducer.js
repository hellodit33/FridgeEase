import {
  GET_USER,
  GET_USER_FOOD,
  EDIT_FOOD,
  DELETE_FOOD,
  GET_FOOD_TO_RECIPE,
} from "../actions/user.actions";

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload;

    case GET_USER_FOOD:
      return action.payload;
    case GET_FOOD_TO_RECIPE:
      return action.payload;

    case EDIT_FOOD:
      return state.map((user) => {
        if (user._id === action.payload.userId) {
          return {
            ...user,
            usersfood: user.usersfood.map((food) => {
              if (food._id === action.payload.foodId) {
                return {
                  ...usersfood,
                  /*foodName: action.payload.foodName,*/
                  /*foodExpiration: action.payload.foodExpiration,
                  foodQuantity: action.payload.foodQuantity,*/
                };
              } else {
                return usersfood;
              }
            }),
          };
        }
        return user;
      });
    case DELETE_FOOD:
      return state.map((user) => {
        if (user._id === action.payload.userId) {
          return {
            ...user,
            usersfood: user.usersfood.filter(
              (food) => food._id !== action.payload.foodId
            ),
          };
        }
        return user;
      });
    default:
      return state;
  }
}
