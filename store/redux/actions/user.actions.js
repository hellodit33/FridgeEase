import axios from "axios";

export const GET_USER = "GET_USER";
export const GET_USER_FOOD = "GET_USER_FOOD";
export const EDIT_FOOD = "EDIT_FOOD";
export const EDIT_SHOPPING_ITEM = "EDIT_SHOPPING_ITEM";

export const DELETE_FOOD = "DELETE_FOOD";
export const DELETE_SHOPPING_ITEM = "DELETE_SHOPPING_ITEM";
export const ADD_FOOD_TO_RECIPE = "ADD_FOOD_TO_RECIPE";
export const GET_FOOD_TO_RECIPE = "GET_FOOD_TO_RECIPE";
export const ADD_FROM_RECIPE_TO_SHOPPING_LIST =
  "ADD_FROM_RECIPE_TO_SHOPPING_LIST";
export const ADD_FROM_FRIDGE_TO_SHOPPING_LIST =
  "ADD_FROM_FRIDGE_TO_SHOPPING_LIST";

export const ADD_FAV_RECIPE = "ADD_FAV_RECIPE";
export const UPDATE_DIET = "UPDATE_DIET";

export const DELETE_ALL_SHOPPING_ITEMS = "DELETE_ALL_SHOPPING_ITEMS";
const BASE_URL = "https://0bbe-213-163-151-83.eu.ngrok.io";

export const getUser = (uid) => {
  return (dispatch) => {
    return axios
      .get(`${BASE_URL}/api/user/${uid}`)
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
};

export const editFoodFromFridge = (
  userId,
  foodId,
  foodExpirationDate,
  foodQuantity
) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${BASE_URL}/api/user/editfood/${userId}`,
      data: { foodId, foodExpirationDate, foodQuantity },
    })
      .then((res) => {
        dispatch({
          type: EDIT_FOOD,
          payload: { userId, foodId, foodExpirationDate, foodQuantity },
        });
      })
      .catch((err) => console.log(err));
  };
};

export const editFoodFromShopping = (
  userId,
  foodId,
  foodBioQuality,
  foodQuantity
) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${BASE_URL}/api/user/editshoppingitem/${userId}`,
      data: { foodId, foodBioQuality, foodQuantity },
    })
      .then((res) => {
        dispatch({
          type: EDIT_SHOPPING_ITEM,
          payload: { userId, foodId, foodBioQuality, foodQuantity },
        });
      })
      .catch((err) => console.log(err));
  };
};

export const deleteFoodFromFridge = (userId, foodId) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${BASE_URL}/api/user/deletefood/${userId}`,
      data: { foodId },
    })
      .then((res) => {
        dispatch({ type: DELETE_FOOD, payload: { userId, foodId } });
      })
      .catch((err) => console.log(err));
  };
};

export const deleteFoodFromShopping = (userId, foodId) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${BASE_URL}/api/user/deleteshoppingitem/${userId}`,
      data: { foodId },
    })
      .then((res) => {
        dispatch({ type: DELETE_SHOPPING_ITEM, payload: { userId, foodId } });
      })
      .catch((err) => console.log(err));
  };
};

export const addFoodToRecipe = (userId, foodName) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${BASE_URL}/api/user/addtorecipe/` + userId,
      data: {
        foodName,
      },
    })
      .then((res) => {
        dispatch({
          type: ADD_FOOD_TO_RECIPE,
          payload: {
            foodName,
          },
        });
      })
      .catch((err) => console.log(err));
  };
};

export const addFromRecipeToShopping = (userId, foodName, foodQuantity) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${BASE_URL}/api/user/addtoshoppinglist/` + userId,
      data: {
        foodName,
        foodQuantity,
      },
    })
      .then((res) => {
        dispatch({
          type: ADD_FROM_RECIPE_TO_SHOPPING_LIST,
          payload: {
            foodName,
            foodQuantity,
          },
        });
      })
      .catch((err) => console.log(err));
  };
};

export const addFavoriteRecipe = (userId, recipeId) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${BASE_URL}/api/user/addfavrecipe/` + userId,
      data: {
        recipeId,
      },
    })
      .then((res) => {
        dispatch({
          type: ADD_FAV_RECIPE,
          payload: {
            recipeId,
          },
        });
      })
      .catch((err) => console.log(err));
  };
};

export const updateDiet = (userId, diet) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${BASE_URL}/api/user/${userId}/diet`,
      data: {
        diet,
      },
    })
      .then((res) => {
        dispatch({
          type: UPDATE_DIET,
          payload: {
            diet,
          },
        });
      })
      .catch((err) => console.log(err));
  };
};

/*export const getFoodToRecipe = (userId, foodName) => {
  return (dispatch) => {
    return axios({
      method: "get",
      url:
        `https://07c7-213-163-151-83.eu.ngrok.io/api/user/gettorecipe/` +
        userId,
    })
      .then((res) => {
        dispatch({
          type: GET_FOOD_TO_RECIPE,
          payload: {
            foodName,
          },
        });
      })
      .catch((err) => console.log(err));
  };
};*/

export const getFoodToRecipe = (userId) => {
  return (dispatch) => {
    return axios
      .get(`${BASE_URL}/api/user/gettorecipe/` + userId)
      .then((res) => {
        dispatch({ type: GET_FOOD_TO_RECIPE, payload: res.data.foodToRecipe });
      })
      .catch((err) => console.log(err));
  };
};

export const addFromFridgeToShopping = (userId, foodName) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${BASE_URL}/api/user/addtoshoppinglist/` + userId,
      data: {
        foodName,
      },
    })
      .then((res) => {
        dispatch({
          type: ADD_FROM_FRIDGE_TO_SHOPPING_LIST,
          payload: {
            foodName,
          },
        });
      })
      .catch((err) => console.log(err));
  };
};

export const removeShoppingList = (userId) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${BASE_URL}/api/user/removeshoppinglist/` + userId,
    })
      .then((res) => {
        dispatch({
          type: DELETE_ALL_SHOPPING_ITEMS,
        });
      })
      .catch((err) => console.log(err));
  };
};
