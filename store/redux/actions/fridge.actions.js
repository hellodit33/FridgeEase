import axios from "axios";

export const FETCH_FOOD = "FETCH_FOOD";

export const fetchFood = () => {
  return (dispatch) => {
    return axios
      .get("https://3d54-84-216-128-40.eu.ngrok.io/api/fridge")
      .then((res) => {
        dispatch({ type: FETCH_FOOD, payload: res.data });
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
};
