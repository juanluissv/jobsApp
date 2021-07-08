import {
  GET_POSTULANTS_REQUEST,
  GET_POSTULANTS_SUCCESS,
  GET_POSTULANTS_FAIL,
} from '../constants/jobsConstants';

const initialState = {
  jobPostulants: [],
};

export const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTULANTS_REQUEST:
      return {
        ...state,
        loading: true,
        jobPostulants: [],
      };
    case GET_POSTULANTS_SUCCESS:
      return {
        ...state,
        loading: false,
        jobPostulants: action.payload,
      };
    case GET_POSTULANTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
