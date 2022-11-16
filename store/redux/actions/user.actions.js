import axios from "axios";

export const GET_USER = "GET_USER";
export const GET_USER_FOOD = "GET_USER_FOOD";
export const EDIT_FOOD = "EDIT_FOOD";
export const DELETE_FOOD = "DELETE_FOOD";
export const ADD_FOOD_TO_RECIPE = "ADD_FOOD_TO_RECIPE";
export const GET_FOOD_TO_RECIPE = "GET_FOOD_TO_RECIPE";
const BASE_URL = "https://4bae-213-163-151-83.eu.ngrok.io";

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
  foodCarbon,
  foodExpiration,
  foodQuantity
) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${BASE_URL}/api/user/editfood/${userId}`,
      data: { foodId, foodExpiration, foodQuantity },
    })
      .then((res) => {
        dispatch({
          type: EDIT_FOOD,
          payload: { userId, foodId, foodExpiration, foodQuantity },
        });
      })
      .catch((err) => console.log(err));
  };
};

export const deleteFoodFromFridge = (userId, foodId) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${BASE_URL}/api/user/deletefood/${userId}`,
      data: { foodId },
    })
      .then((res) => {
        dispatch({ type: DELETE_FOOD, payload: { userId, foodId } });
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
