import axios from "axios";
export const GET_BARTERS_REQUEST = "GET_BARTERS_REQUEST";
export const GET_BARTERS_SUCCESS = "GET_BARTERS_SUCCESS";
export const GET_BARTERS_FAILURE = "GET_BARTERS_FAILURE";

export const CREATE_BARTER_REQUEST = "CREATE_BARTER_REQUEST";
export const CREATE_BARTER_SUCCESS = "CREATE_BARTER_SUCCESS";
export const CREATE_BARTER_FAILURE = "CREATE_BARTER_FAILURE";

export const OPEN_BARTER_FORM_REQUEST = "OPEN_BARTER_FORM_REQUEST";
export const OPEN_BARTER_FORM_SUCCESS = "OPEN_BARTER_FORM_SUCCESS";
export const OPEN_BARTER_FORM_FAILURE = "OPEN_BARTER_FORM_FAILURE";

export const EDIT_BARTER_REQUEST = "EDIT_BARTER_REQUEST";
export const EDIT_BARTER_SUCCESS = "EDIT_BARTER_SUCCESS";
export const EDIT_BARTER_FAILURE = "EDIT_BARTER_FAILURE";

export const DELETE_BARTER_REQUEST = "DELETE_BARTER_REQUEST";
export const DELETE_BARTER_SUCCESS = "DELETE_BARTER_SUCCESS";
export const DELETE_BARTER_FAILURE = "DELETE_BARTER_FAILURE";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const DELETE_COMMENT_REQUEST = "DELETE_COMMENT_REQUEST";
export const DELETE_COMMENT_SUCCESS = "DELETE_COMMENT_SUCCESS";
export const DELETE_COMMENT_FAILURE = "DELETE_COMMENT_FAILURE";

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
const getBartersFailure = (error) => {
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

export const createBarter = ({ barter, learn, teach }) => {
  return (dispatch) => {
    const requestOptions = {
      method: "post",
      url: "http://localhost:4000/api/barter",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: {
        barter: barter,
        learn: learn,
        teach: teach,
      },
    };
    dispatch(createBartersRequest());
    axios(requestOptions)
      .then((response) => {
        dispatch(createBartersSuccess(response.data));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(createBartersFailure(errorMsg));
      });
  };
};

export const editBarterRequest = () => {
  return {
    type: EDIT_BARTER_REQUEST,
  };
};
export const editBarterSuccess = (barter) => {
  return {
    type: EDIT_BARTER_SUCCESS,
    payload: barter,
  };
};
export const editBarterFailure = (error) => {
  return {
    type: EDIT_BARTER_FAILURE,
    payload: error,
  };
};

export const editBarter = ({ barter, learn, teach, id }) => {
  return (dispatch) => {
    const requestOptions = {
      method: "PUT",
      url: `http://localhost:4000/api/barter/${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        barter: barter,
        learn: learn,
        teach: teach,
      },
    };
    dispatch(editBarterRequest());

    return axios(requestOptions)
      .then((response) => {
        dispatch(editBarterSuccess(response.data));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(editBarterFailure(errorMsg));
      });
  };
};

export const deleteBarterRequest = () => {
  return {
    type: DELETE_BARTER_REQUEST,
  };
};
export const deleteBarterSuccess = (barter) => {
  return {
    type: DELETE_BARTER_SUCCESS,
    payload: barter,
  };
};
export const deleteBarterFailure = (error) => {
  return {
    type: DELETE_BARTER_FAILURE,
    payload: error,
  };
};

export const deleteBarter = (id) => {
  return (dispatch) => {
    const requestOptions = {
      method: "DELETE",
      url: `http://localhost:4000/api/barter/${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    dispatch(deleteBarterRequest());
    return axios(requestOptions)
      .then((response) => {
        dispatch(deleteBarterSuccess(response.data));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(deleteBarterFailure(errorMsg));
      });
  };
};

export const addCommentRequest = () => {
  return {
    type: ADD_COMMENT_REQUEST,
  };
};
export const addCommentSuccess = (comment) => {
  return {
    type: ADD_COMMENT_SUCCESS,
    payload: comment,
  };
};
export const addCommentFailure = (error) => {
  return {
    type: ADD_COMMENT_FAILURE,
    payload: error,
  };
};

export const addComment = ({id, comment}) => {
  return (dispatch) => {
    const requestOptions = {
      method: "POST",
      url: `http://localhost:4000/api/comment/barter/${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      data: {
        comment,
      },
    };
    dispatch(addCommentRequest());
    return axios(requestOptions)
      .then((response) => {
        dispatch(addCommentSuccess(response.data));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(addCommentFailure(errorMsg));
      });
  };
};


export const deleteCommentRequest = () => {
  return {
    type: DELETE_COMMENT_REQUEST,
  };
};
export const deleteCommentSuccess = (comment) => {
  return {
    type: DELETE_COMMENT_SUCCESS,
    payload: comment,
  };
};
export const deleteCommentFailure = (error) => {
  return {
    type: DELETE_COMMENT_FAILURE,
    payload: error,
  };
};

export const deleteComment = (id) => {
  return (dispatch) => {
    const requestOptions = {
      method: "DELETE",
      url: `http://localhost:4000/api/comment/${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    dispatch(deleteCommentRequest());
    return axios(requestOptions)
      .then((response) => {    
        dispatch(deleteCommentSuccess(response.data));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(deleteCommentFailure(errorMsg));
      });
  };
};