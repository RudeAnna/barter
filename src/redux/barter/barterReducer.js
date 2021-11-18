import {
  GET_BARTERS_REQUEST,
  GET_BARTERS_SUCCESS,
  GET_BARTERS_FAILURE,
  CREATE_BARTER_REQUEST,
  CREATE_BARTER_SUCCESS,
  CREATE_BARTER_FAILURE,
  EDIT_BARTER_REQUEST,
  EDIT_BARTER_SUCCESS,
  EDIT_BARTER_FAILURE,
  DELETE_BARTER_REQUEST,
  DELETE_BARTER_SUCCESS,
  DELETE_BARTER_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
} from "./barterActions";

const initialstate = {
  barters: [],
  isFetching: false,
  isCreating: false,
  isEditing: false,
  isDeleting: false,
  isAdding: false,
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
        isFetching: false,
        barters: action.payload.items,
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
        isCreating: false,
        barters: [{ ...action.payload, comments: [] }, ...state.barters],
      };
    }
    case CREATE_BARTER_FAILURE: {
      return {
        ...state,
        barterError: action.payload,
        isCreating: false,
      };
    }

    case EDIT_BARTER_REQUEST: {
      return {
        ...state,
        isEditing: true,
        barterError: "",
      };
    }
    case EDIT_BARTER_SUCCESS: {
      return {
        ...state,
        isEditing: false,
        barters: state.barters.map((barter) =>
          barter.id === action.payload.id
            ? { ...action.payload, comments: [...barter.comments] }
            : barter
        ),
      };
    }
    case EDIT_BARTER_FAILURE: {
      return {
        ...state,
        barterError: action.payload,
        isEditing: false,
      };
    }

    case DELETE_BARTER_REQUEST: {
      return {
        ...state,
        isDeleting: true,
        barterError: "",
      };
    }
    case DELETE_BARTER_SUCCESS: {
      return {
        ...state,
        isDeleting: false,
        barters: state.barters.filter(
          (barter) => barter.id !== action.payload.id
        ),
      };
    }
    case DELETE_BARTER_FAILURE: {
      return {
        ...state,
        barterError: action.payload,
        isDeleting: false,
      };
    }

    case ADD_COMMENT_REQUEST: {
      return {
        ...state,
        isAdding: true,
        barterError: "",
      };
    }
    case ADD_COMMENT_SUCCESS: {
      return {
        ...state,
        isAdding: false,
        barters: state.barters.map((barter) =>
          barter.id === action.payload.barter.id
            ? { ...barter, comments: [action.payload, ...barter.comments] }
            : barter
        ),
      };
    }
    case ADD_COMMENT_FAILURE: {
      return {
        ...state,
        barterError: action.payload,
        isAdding: false,
      };
    }

    case DELETE_COMMENT_REQUEST: {
      return {
        ...state,
        isDeleting: true,
        barterError: "",
      };
    }
    case DELETE_COMMENT_SUCCESS: {
      return {
        ...state,
        isDeleting: false,
        barters: state.barters.map((barter) => ({
          ...barter,
          comments: barter.comments.filter(
            (comment) => comment.id !== action.payload.id
          ),
        })),
      };
    }
    case DELETE_COMMENT_FAILURE: {
      return {
        ...state,
        barterError: action.payload,
        isDeleting: false,
      };
    }

    default:
      return state;
  }
};

export default bartersReducer;
