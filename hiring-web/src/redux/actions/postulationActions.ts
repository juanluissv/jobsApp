import {
  POSTULATION_REQUEST,
  POSTULATION_SUCCESS,
  POSTULATION_FAIL,
  POSTULATION_INFO,
  POSTULATION_INFO_FAIL,
} from '../constants/postulationConstants';

import { axios } from '../../services/api';
import SweetAlert from 'sweetalert2';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const postulation =
  (userJob, userId, jobId, method) => async (dispatch) => {
    try {
      dispatch({
        type: POSTULATION_REQUEST,
      });

      const { data, status } = await axios[method](
        `${BACKEND_URL}/user_job/postulate/${userId}/${jobId}`,
        userJob
      );

      if (status === 200)
        SweetAlert.fire('Exito!', 'Los datos fueron enviados', 'success');

      dispatch({
        type: POSTULATION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      SweetAlert.fire(
        'Ups!',
        `${error.response.data.errors[0].message}`,
        'error'
      );

      dispatch({
        type: POSTULATION_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const postulationInfo = (userId, jobId) => (dispatch) => {
  axios
    .get(`${BACKEND_URL}/user_job/postulate/${userId}/${jobId}`)
    .then((data) => {
      dispatch({
        type: POSTULATION_INFO,
        payload: data.data,
      });
    })
    .catch(() => {
      dispatch({
        type: POSTULATION_INFO_FAIL,
      });
    });
};
