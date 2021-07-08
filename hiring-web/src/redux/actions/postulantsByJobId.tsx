import {
  GET_POSTULANTS_REQUEST,
  GET_POSTULANTS_SUCCESS,
  GET_POSTULANTS_FAIL,
} from '../constants/jobsConstants';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const getPostulantsByJobId = (jobId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_POSTULANTS_REQUEST,
    });

    const { data } = await axios.get(
      `${BACKEND_URL}/user_job/applicants/${jobId}`
    );

    dispatch({
      type: GET_POSTULANTS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_POSTULANTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
