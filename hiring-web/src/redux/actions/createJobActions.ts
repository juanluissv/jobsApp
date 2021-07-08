import {
  CREATE_JOB_REQUEST,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_FAIL,
} from '../constants/createJobConstants';
import axios from 'axios';
import SweetAlert from 'sweetalert2';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const createJob = (data) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_JOB_REQUEST,
    });
    const { status } = await axios.post(`${BACKEND_URL}/jobs`, data);
    if (status) SweetAlert.fire('Exito!', 'Postulacion creada', 'success');

    dispatch({
      type: CREATE_JOB_SUCCESS,
      payload: data,
    });
  } catch (error) {
    SweetAlert.fire('Ups!', `${error.message}`, 'error');
    dispatch({
      type: CREATE_JOB_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
