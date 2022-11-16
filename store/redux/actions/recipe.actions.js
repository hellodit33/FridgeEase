import axios from "axios";

export const FETCH_RECIPES = "FETCH_RECIPES";

const BASE_URL = "https://4bae-213-163-151-83.eu.ngrok.io";
export const fetchRecipes = () => {
  return (dispatch) => {
    return axios
      .get(`${BASE_URL}/api/recipes`)
      .then((res) => {
        dispatch({ type: FETCH_RECIPES, payload: res.data });
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
};
