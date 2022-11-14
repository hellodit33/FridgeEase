import axios from "axios";

export const FETCH_FOOD = "FETCH_FOOD";
export const ADD_FOOD_TO_FRIDGE = "ADD_FOOD_TO_FRIDGE";
export const REMOVE_FOOD_FROM_FRIDGE = "REMOVE_FOOD_FROM_FRIDGE";

const BASE_URL = "https://2522-213-163-151-83.eu.ngrok.io";
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
