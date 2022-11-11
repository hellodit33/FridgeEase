import axios from "axios";

export const GET_USER = "GET_USER";

export const getUser = (uid) => {
  return (dispatch) => {
    return axios
      .get(`https://f56e-213-163-151-83.eu.ngrok.io/api/user/${uid}`)
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
};
