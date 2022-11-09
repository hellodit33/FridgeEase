import axios from "axios";

export const FETCH_FOOD = "FETCH_FOOD";
export const ADD_FOOD_TO_FRIDGE = "ADD_FOOD_TO_FRIDGE";
export const REMOVE_FOOD_FROM_FRIDGE = "REMOVE_FOOD_FROM_FRIDGE";

export const fetchFood = () => {
  return (dispatch) => {
    return axios
      .get("https://180e-2-71-56-111.eu.ngrok.io/api/food")
      .then((res) => {
        dispatch({ type: FETCH_FOOD, payload: res.data });
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
};

export const addFoodToFridge = (userId, foodIdToAdd) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: "https://180e-2-71-56-111.eu.ngrok.io/api/user/addfood/" + userId,
      data: { foodIdToAdd },
    })
      .then((res) => {
        dispatch({ type: ADD_FOOD_TO_FRIDGE, payload: { foodIdToAdd } });
      })
      .catch((err) => console.log(err));
  };
};

export const removeFoodFromFridge = (userId, foodIdToRemove) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: "https://180e-2-71-56-111.eu.ngrok.io/api/user/removefood/" + userId,
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
