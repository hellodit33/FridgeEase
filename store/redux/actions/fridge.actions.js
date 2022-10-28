import axios from "axios";

export const FETCH_FOOD = "FETCH_FOOD";
export const ADD_FOOD_TO_FRIDGE = "ADD_FOOD_TO_FRIDGE";

export const fetchFood = () => {
  return (dispatch) => {
    return axios
      .get(" https://98f8-130-25-23-208.eu.ngrok.io/api/food")
      .then((res) => {
        dispatch({ type: FETCH_FOOD, payload: res.data });
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
};

export const addFood = (data) => {
  return (dispatch) => {
    return axios.post("https://98f8-130-25-23-208.eu.ngrok.io/api/post", data);
  };
};

export const addFoodToFridge = (foodIdToAdd) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: "https://98f8-130-25-23-208.eu.ngrok.io/api/post",
      data: { foodIdToAdd },
    })
      .then((res) => {
        dispatch({ type: ADD_FOOD_TO_FRIDGE, payload: { foodIdToAdd } });
      })
      .catch((err) => console.log("not working"));
  };
};
