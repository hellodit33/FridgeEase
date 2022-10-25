import axios from "axios";

export const FETCH_FOOD = "FETCH_FOOD";

export const fetchFood = () => {
  return (dispatch) => {
    return axios
      .get("https://0eaf-130-25-23-208.eu.ngrok.io/api/fridge")
      .then((res) => {
        dispatch({ type: FETCH_FOOD, payload: res.data });
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
};
