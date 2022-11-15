import axios from "axios";

export const GET_USER = "GET_USER";
export const GET_USER_FOOD = "GET_USER_FOOD";
export const EDIT_FOOD = "EDIT_FOOD";
export const DELETE_FOOD = "DELETE_FOOD";

export const getUser = (uid) => {
  return (dispatch) => {
    return axios
      .get(`https://de63-213-163-151-83.eu.ngrok.io/api/user/${uid}`)
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
      url: `https://de63-213-163-151-83.eu.ngrok.io/api/user/editfood/${userId}`,
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
      url: `https://de63-213-163-151-83.eu.ngrok.io/api/user/deletefood/${userId}`,
      data: { foodId },
    })
      .then((res) => {
        dispatch({ type: DELETE_FOOD, payload: { userId, foodId } });
      })
      .catch((err) => console.log(err));
  };
};

/*export const getUserFood = (uid) => {
  return (dispatch) => {
    return axios
      .get(`https://de63-213-163-151-83.eu.ngrok.io/api/user/${uid}/userfood`)
      .then((res) => {
        dispatch({ type: GET_USER_FOOD, payload: res.data.usersfood });
        console.log(res.data.usersfood);
        console.log("hellohellouserfood");
      })
      .catch((err) => console.log(err));
  };
};*/
