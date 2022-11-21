import axios from "axios";

export const FETCH_FOOD = "FETCH_FOOD";
export const ADD_FOOD_TO_FRIDGE = "ADD_FOOD_TO_FRIDGE";
export const ADD_SHOPPING_TO_FRIDGE = "ADD_SHOPPING_TO_FRIDGE";

export const REMOVE_FOOD_FROM_FRIDGE = "REMOVE_FOOD_FROM_FRIDGE";

const BASE_URL = "https://0bbe-213-163-151-83.eu.ngrok.io";
export const fetchFood = () => {
  return (dispatch) => {
    return axios
      .get(`${BASE_URL}/api/food`)
      .then((res) => {
        dispatch({ type: FETCH_FOOD, payload: res.data });
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
};

export const addFoodToFridge = (
  userId,
  foodIdToAdd,
  foodName,
  foodLogo,
  foodCarbon,
  foodCategory,
  foodExpiration
) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${BASE_URL}/api/user/addfood/` + userId,
      data: {
        foodIdToAdd,
        foodName,
        foodLogo,
        foodCarbon,
        foodCategory,
        foodExpiration,
      },
    })
      .then((res) => {
        dispatch({
          type: ADD_FOOD_TO_FRIDGE,
          payload: {
            foodIdToAdd,
            foodName,
            foodLogo,
            foodCarbon,
            foodCategory,
            foodExpiration,
          },
        });
      })
      .catch((err) => console.log(err));
  };
};

export const removeFoodFromFridge = (userId, foodIdToRemove) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${BASE_URL}/api/user/removefood/` + userId,
      data: { foodIdToRemove },
    })
      .then((res) => {
        dispatch({
          type: REMOVE_FOOD_FROM_FRIDGE,
          payload: { foodIdToRemove },
        });
      })
      .catch((err) => console.log(err));
  };
};

export const addShoppingToFridge = (
  userId,
  foodId,
  foodName,
  foodCarbon,
  foodExpiration,
  foodCategory,
  foodLogo
) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${BASE_URL}/api/user/addshoppingtofridge/` + userId,
      data: {
        foodId,
        foodName,
        foodCarbon,
        foodExpiration,
        foodCategory,
        foodLogo,
      },
    })
      .then((res) => {
        dispatch({
          type: ADD_SHOPPING_TO_FRIDGE,
          payload: {
            foodId,
            foodName,
            foodCarbon,
            foodExpiration,
            foodCategory,
            foodLogo,
          },
        });
      })
      .catch((err) => console.log(err));
  };
};
