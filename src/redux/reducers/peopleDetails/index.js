import { LOAD_USER_DETAILS, LOAD_USER_DETAILS_SUCCESS, LOAD_USER_DETAILS_FAILURE } from "./actions";

const initialPeopleDetailsState = {
  loading: false,
  error: null,
  data: null,
};

function userDetailsReducer(state = initialPeopleDetailsState, { type, payload }) {
  switch (type) {
    case LOAD_USER_DETAILS:

      return {
        ...state,
        loading: true,
      };

    case LOAD_USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload,
        error: null,
      };

    case LOAD_USER_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
}

export default userDetailsReducer;
