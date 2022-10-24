import axios from "axios";

export const FETCH_FOOD = "FETCH_FOOD";

export const fetchFood = () => {
  return (dispatch) => {
    return axios
      .get(`http://localhost:5000/api/fridge`)
      .then((res) => {
        dispatch({ type: FETCH_FOOD, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};
