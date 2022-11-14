import axios from "axios";

export const GET_USER = "GET_USER";
export const GET_USER_FOOD = "GET_USER_FOOD";

export const getUser = (uid) => {
  return (dispatch) => {
    return axios
      .get(`https://2522-213-163-151-83.eu.ngrok.io/api/user/${uid}`)
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
};

export const getUserFood = (uid) => {
  return (dispatch) => {
    return axios
      .get(`https://2522-213-163-151-83.eu.ngrok.io/api/user/${uid}/userfood`)
      .then((res) => {
        dispatch({ type: GET_USER_FOOD, payload: res.data.usersfood });
        console.log(res.data.usersfood);
        console.log("hellohellouserfood");
      })
      .catch((err) => console.log(err));
  };
};
