import {
  CREATE_JOB_REQUEST,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_FAIL,
} from '../constants/createJobConstants';

export const createJobReducer = (state = { job: {} }, action) => {
  switch (action.type) {
    case CREATE_JOB_REQUEST:
      return {
        job: action.payload,
      };
    case CREATE_JOB_SUCCESS:
      return {
        job: action.payload,
      };
    case CREATE_JOB_FAIL:
      return {
        error: action.payload,
      };
    default:
      return state;
  }
};
