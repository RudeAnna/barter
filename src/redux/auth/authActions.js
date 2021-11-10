import axios from "axios";

export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE";
export const LOGOUT_USER = "LOGOUT_USER";

export const loginRequest = () => {
  return {
    type: LOGIN_USER_REQUEST,
  };
};

export const loginSuccess = (currentUser) => {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: currentUser,
  };
};

export const loginFailure = (error) => {
  return {
    type: LOGIN_USER_FAILURE,
    payload: error,
  };
};

export const logout = (currentUser) => {
  return {
    type: LOGOUT_USER,
    payload: currentUser,
  };
};

export const loginUser = ({ username, password }) => {
  return (dispatch) => {
    const requestOptions = {
      method: "POST",
      url: "http://localhost:4000/login",
      headers: { "Content-Type": "application/json" },
      data: {
        username: username,
        password: password,
      },
    };
    dispatch(loginRequest());
    return axios(requestOptions)
      .then((response) => {
        dispatch(loginSuccess(response.data));
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(loginFailure(errorMsg));
      });
  };
};
