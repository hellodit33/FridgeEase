export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAIL = "REGISTER_USER_FAIL";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAIL = "LOGIN_USER_FAIL";
export const LOG_OUT = LOG_OUT;

const BASE_URL = "https://fridgeease-app.herokuapp.com";
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

export const logoutUser = () => {
  return async (dispatch) => {
    await fetch(`${BASE_URL}/api/user/logout`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
};
