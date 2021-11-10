import {
  GET_BARTERS_REQUEST,
  GET_BARTERS_SUCCESS,
  GET_BARTERS_FAILURE,
  CREATE_BARTER_REQUEST,
  CREATE_BARTER_SUCCESS,
  CREATE_BARTER_FAILURE,
} from "./barterActions";

const initialstate = {
  barters: [],
  isFetching: false,
  isCreating: false,
  barterError: "",
};

const bartersReducer = (state = initialstate, action) => {
  switch (action.type) {
    case GET_BARTERS_REQUEST: {
      return {
        ...state,
        isFetching: true,
        barterError: "",
      };
    }
    case GET_BARTERS_SUCCESS: {
      return {
        ...state,
        barters: action.payload.items,
        isFetching: false,
      };
    }
    case GET_BARTERS_FAILURE: {
      return {
        ...state,
        barterError: action.payload,
        isFetching: false,
      };
    }

    case CREATE_BARTER_REQUEST: {
      return {
        ...state,
        isCreating: true,
        barterError: "",
      };
    }
    case CREATE_BARTER_SUCCESS: {
      return {
        ...state,
        barters: [action.payload, ...state.barters],
        isCreating: false,
      };
    }
    case CREATE_BARTER_FAILURE: {
      return {
        ...state,
        barterError: action.payload,
        isCreating: false,
      };
    }

    default:
      return state;
  }
};

export default bartersReducer;
