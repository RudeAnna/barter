import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER,
} from "./authActions";

const initialState = {
  currentUser: null,
  isAuthenticating: false,
  authError: "",
};

const authReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case LOGIN_USER_REQUEST: {
      return {
        ...state,
        isAuthenticating: true,
        authError: "",
      };
    }
    case LOGIN_USER_SUCCESS: {
      console.log(action.payload)
      return {
        ...state,
        currentUser: action.payload,
        isAuthenticating: false,
      };
    }
    case LOGIN_USER_FAILURE: {
      return {
        ...state,
        authError: action.payload,
        isAuthenticating: false,
      };
    }
    case LOGOUT_USER: {
      return {
        ...state,
        currentUser: null,
      }
    }
    default:
      return state;
  }
};

export default authReducer;
