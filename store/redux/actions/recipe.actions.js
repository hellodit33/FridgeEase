import axios from "axios";

export const FETCH_RECIPES = "FETCH_RECIPES";
export const SELECT_RECIPE = "SELECT_RECIPE";

const BASE_URL = "https://f916-213-163-151-83.eu.ngrok.io";
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

export const selectRecipe = (recipeId, selectedBoolean) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${BASE_URL}/api/recipes/selectrecipe/${recipeId}`,
      data: {
        selectedBoolean,
      },
    })
      .then((res) => {
        dispatch({
          type: SELECT_RECIPE,
          payload: {
            recipeId,
            selectedBoolean,
          },
        });
      })
      .catch((err) => console.log(err));
  };
};
