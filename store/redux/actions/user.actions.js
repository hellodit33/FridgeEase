import axios from "axios";

export const GET_USER = "GET_USER";
export const GET_USER_FOOD = "GET_USER_FOOD";
export const EDIT_FOOD_QUANTITY = "EDIT_FOOD_QUANTITY";
export const EDIT_FOOD_EXPIRATION = "EDIT_FOOD_EXPIRATION";

export const EDIT_SHOPPING_QUANTITY = "EDIT_SHOPPING_QUANTITY";
export const EDIT_SHOPPING_BIOQUALITY = "EDIT_SHOPPING_BIOQUALITY";

export const DELETE_RECIPE_FOOD_FILTER = "DELETE_RECIPE_FOOD_FILTER";
export const DELETE_FAVORITE_RECIPE = "DELETE_FAVORITE_RECIPE";

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
export const UPDATE_ALLERGY = "UPDATE_ALLERGY";

export const DELETE_ALL_SHOPPING_ITEMS = "DELETE_ALL_SHOPPING_ITEMS";

const BASE_URL = "https://fridgeease-app.herokuapp.com";

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

export const editFoodExpiration = (userId, foodId, foodExpirationDate) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${BASE_URL}/api/user/editfridgeexpiration/${userId}`,
      data: { foodId, foodExpirationDate },
    })
      .then((res) => {
        dispatch({
          type: EDIT_FOOD_EXPIRATION,
          payload: { foodId, foodExpirationDate },
        });
      })
      .catch((err) => console.log(err));
  };
};

export const editFoodQuantity = (userId, foodId, foodQuantity) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${BASE_URL}/api/user/editfridgequantity/${userId}`,
      data: { foodId, foodQuantity },
    })
      .then((res) => {
        dispatch({
          type: EDIT_FOOD_QUANTITY,
          payload: { foodId, foodQuantity },
        });
      })
      .catch((err) => console.log(err));
  };
};

export const editShoppingQuantity = (userId, foodId, foodQuantity) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${BASE_URL}/api/user/editshoppingquantity/${userId}`,
      data: { foodId, foodQuantity },
    })
      .then((res) => {
        dispatch({
          type: EDIT_SHOPPING_QUANTITY,
          payload: { foodId, foodQuantity },
        });
      })
      .catch((err) => console.log(err));
  };
};

export const editShoppingBioQuality = (userId, foodId, foodBioQuality) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${BASE_URL}/api/user/editshoppingbio/${userId}`,
      data: { foodId, foodBioQuality },
    })
      .then((res) => {
        dispatch({
          type: EDIT_SHOPPING_BIOQUALITY,
          payload: { foodId, foodBioQuality },
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

export const deleteRecipeFoodFilter = (userId, foodName) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${BASE_URL}/api/user/deleterecipefood/${userId}`,
      data: { foodName },
    })
      .then((res) => {
        dispatch({
          type: DELETE_RECIPE_FOOD_FILTER,
          payload: { foodName },
        });
      })
      .catch((err) => console.log(err));
  };
};

export const deleteFavoriteRecipe = (userId, recipeIdToRemove) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${BASE_URL}/api/user/removefavrecipe/${userId}`,
      data: { recipeIdToRemove },
    })
      .then((res) => {
        dispatch({
          type: DELETE_FAVORITE_RECIPE,
          payload: { userId, recipeIdToRemove },
        });
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
      url: `${BASE_URL}/api/user/${userId}/updatediet`,
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

export const updateAllergy = (userId, allergy) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${BASE_URL}/api/user/${userId}/updateallergy`,
      data: {
        allergy,
      },
    })
      .then((res) => {
        dispatch({
          type: UPDATE_ALLERGY,
          payload: {
            userId,
            allergy,
          },
        });
      })
      .catch((err) => console.log(err));
  };
};

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
