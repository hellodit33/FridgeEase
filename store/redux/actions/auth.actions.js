export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAIL = "REGISTER_USER_FAIL";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAIL = "LOGIN_USER_FAIL";

const BASE_URL = "https://bd23-213-163-151-83.eu.ngrok.io";
export const registerUser = (authData) => {
  const { email, password } = authData;
  return async (dispatch) => {
    const result = await fetch(`${BASE_URL}/api/user/register`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const resultData = await result.json();
    console.log(resultData);
    console.log("made it");

    if (resultData.success) {
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: resultData,
      });
    } else {
      dispatch({
        type: REGISTER_USER_FAIL,
        payload: resultData,
      });
    }
    return resultData;
  };
};

export const loginUser = (authData) => {
  const { email, password } = authData;
  return async (dispatch) => {
    const result = await fetch(`${BASE_URL}/api/user/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const resultData = await result.json();
    console.log(resultData);

    if (resultData.success) {
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: resultData,
      });
    } else {
      dispatch({
        type: LOGIN_USER_FAIL,
        payload: resultData,
      });
    }
    return resultData;
  };
};
