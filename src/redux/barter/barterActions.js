import axios from "axios";
export const GET_BARTERS_REQUEST = "GET_BARTERS_BARTERS";
export const GET_BARTERS_SUCCESS = "GET_BARTERS_SUCCESS";
export const GET_BARTERS_FAILURE = "GET_BARTERS_FAILURE";

export const CREATE_BARTER_REQUEST = "CREATE_BARTER_REQUEST";
export const CREATE_BARTER_SUCCESS = "CREATE_BARTER_SUCCESS";
export const CREATE_BARTER_FAILURE = "CREATE_BARTER_FAILURE";

export const OPEN_BARTER_FORM_REQUEST = "OPEN_BARTER_FORM_REQUEST";
export const OPEN_BARTER_FORM_SUCCESS = "OPEN_BARTER_FORM_SUCCESS";
export const OPEN_BARTER_FORM_FAILURE = "OPEN_BARTER_FORM_FAILURE";

export const getBartersRequest = () => {
  return {
    type: GET_BARTERS_REQUEST,
  };
};
export const getBartersSuccess = (barters) => {
  return {
    type: GET_BARTERS_SUCCESS,
    payload: barters,
  };
};
export const getBartersFailure = (error) => {
  return {
    type: GET_BARTERS_FAILURE,
    payload: error,
  };
};

export const getBartersList = () => {
  return (dispatch) => {
    const requestOptions = {
      method: "get",
      url: "http://localhost:4000/api/barter",
      headers: {},
    };
    dispatch(getBartersRequest());
    return axios(requestOptions)
      .then((response) => {
        dispatch(getBartersSuccess(response.data));
        console.log(response.data);
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(getBartersFailure(errorMsg));
      });
  };
};

export const createBartersRequest = () => {
  return {
    type: CREATE_BARTER_REQUEST,
  };
};
export const createBartersSuccess = (barter) => {
  return {
    type: CREATE_BARTER_SUCCESS,
    payload: barter,
  };
};
export const createBartersFailure = (error) => {
  return {
    type: CREATE_BARTER_FAILURE,
    payload: error,
  };
};

export const createBarter = ({currentUser, barter, learn, teach }) => {
  return (dispatch) => {
    const requestOptions = {
      method: "post",
      url: "http://localhost:4000/api/barter",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: {
        barter: barter,
        learn: learn,
        teach: teach,
      },
    };
    dispatch(createBartersRequest());
    return axios(requestOptions)
      .then((response) => {
        dispatch(createBartersSuccess(response.data));
        console.log(response.data);
      })
      .catch( (error) => {
        const errorMsg = error.message;
        dispatch(createBartersFailure(errorMsg));
      });
  };
};
