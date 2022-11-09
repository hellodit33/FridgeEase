import {
  REGISTER_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
} from "../actions/auth.actions";

const initialState = {
  user: {},
  errors: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
  }
  return state;
}
