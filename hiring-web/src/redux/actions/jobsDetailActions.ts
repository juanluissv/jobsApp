import {
  GET_JOB_BY_ID_REQUEST,
  GET_JOB_BY_ID_SUCCESS,
  GET_JOB_BY_ID_FAIL,
} from '../constants/jobsDetailConstants';

import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const getJobDetail = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_JOB_BY_ID_REQUEST,
    });

    const { data } = await axios.get(`${BACKEND_URL}/jobs/${id}`);

    dispatch({
      type: GET_JOB_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_JOB_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
