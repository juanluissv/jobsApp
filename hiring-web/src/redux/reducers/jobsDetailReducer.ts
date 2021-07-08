import {
  GET_JOB_BY_ID_REQUEST,
  GET_JOB_BY_ID_SUCCESS,
  GET_JOB_BY_ID_FAIL,
} from '../constants/jobsDetailConstants';

const initialState = {};

export const jobDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_JOB_BY_ID_REQUEST:
      return { loading: true };
    case GET_JOB_BY_ID_SUCCESS:
      return { loading: true, jobDetail: action.payload };
    case GET_JOB_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export default jobDetailReducer;
