export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAIL = "REGISTER_USER_FAIL";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAIL = "LOGIN_USER_FAIL";

const BASE_URL = "https://180e-2-71-56-111.eu.ngrok.io";

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

    const resultData = result.json();
    console.log(resultData);
    console.log("made it");
    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: 1,
    });
  };
};

export const loginUser = (authData) => {
  const { email, password } = authData;
  return async (dispatch) => {
    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: 1,
    });
  };
};
