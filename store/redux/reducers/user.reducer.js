import {
  GET_USER,
  GET_USER_FOOD,
  EDIT_FOOD_EXPIRATION,
  EDIT_FOOD_QUANTITY,
  DELETE_FOOD,
  GET_FOOD_TO_RECIPE,
  DELETE_SHOPPING_ITEM,
  EDIT_SHOPPING_QUANTITY,
  EDIT_SHOPPING_BIOQUALITY,
  DELETE_FAVORITE_RECIPE,
  UPDATE_ALLERGY,
} from "../actions/user.actions";

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload;

    case GET_FOOD_TO_RECIPE:
      return action.payload;
    case UPDATE_ALLERGY:
      return state.map((user) => {
        if (user._id === action.payload.userId) {
          return {
            ...user,
            allergy: action.payload.allergy,
          };
        } else return user;
      });
    case EDIT_FOOD_QUANTITY:
      return state.map((user) => {
        if (user._id === action.payload.userId) {
          return {
            ...user,
            usersfood: user.usersfood.map((food) => {
              if (food._id === action.payload.foodId) {
                return {
                  ...usersfood,
                  foodName: action.payload.foodName,
                };
              } else {
                return usersfood;
              }
            }),
          };
        }
        return user;
      });
    case EDIT_FOOD_EXPIRATION:
      return state.map((user) => {
        if (user._id === action.payload.userId) {
          return {
            ...user,
            usersfood: user.usersfood.map((food) => {
              if (food._id === action.payload.foodId) {
                return {
                  ...usersfood,
                  foodName: action.payload.foodName,
                };
              } else {
                return usersfood;
              }
            }),
          };
        }
        return user;
      });

    case EDIT_SHOPPING_QUANTITY:
      return state.map((user) => {
        if (user._id === action.payload.userId) {
          return {
            ...user,
            shoppingList: user.shoppingList.map((food) => {
              if (food._id === action.payload.foodId) {
                return {
                  ...shoppingList,
                  foodName: action.payload.foodName,
                };
              } else {
                return usersfood;
              }
            }),
          };
        }
        return user;
      });

    case EDIT_SHOPPING_BIOQUALITY:
      return state.map((user) => {
        if (user._id === action.payload.userId) {
          return {
            ...user,
            shoppingList: user.shoppingList.map((food) => {
              if (food._id === action.payload.foodId) {
                return {
                  ...shoppingList,
                  foodName: action.payload.foodName,
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
    case DELETE_SHOPPING_ITEM:
      return state.map((user) => {
        if (user._id === action.payload.userId) {
          return {
            ...user,
            shoppingList: user.shoppingList.filter(
              (food) => food._id !== action.payload.foodId
            ),
          };
        }
        return user;
      });
    case DELETE_FAVORITE_RECIPE:
      return state.map((user) => {
        if (user._id === action.payload.userId) {
          return {
            ...user,
            favoriteRecipe: user.favoriteRecipe.filter(
              (id) => id !== action.payload.recipeIdToRemove
            ),
          };
        }

        return user;
      });

    default:
      return state;
  }
}
