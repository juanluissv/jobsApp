import {
  GET_USER_INFO,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  SIGN_OUT,
  USER_INFO_VALIDATION,
} from '../constants/userConstants';

import { axios, getUser } from '../../services/api';
import SweetAlert from 'sweetalert2';
import { validationSchema } from '../../components/Postulation/validation';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const userUpdate = (user, id, method) => async (dispatch) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    });

    const { data, status } = await axios[method](
      `${BACKEND_URL}/users/${id}`,
      user
    );

    if (status === 200)
      SweetAlert.fire('Exito!', 'Los datos fueron actualizados', 'success');

    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    SweetAlert.fire('Ups!', `${error.message}`, 'error');

    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserInfo = (dispatch) => {
  return getUser().then(({ data }) => {
    dispatch({ type: GET_USER_INFO, payload: data });

    validationSchema
      .validate(data)
      .then(() => {
        dispatch({
          type: USER_INFO_VALIDATION,
          payload: true,
        });
      })
      .catch(() => {
        dispatch({
          type: USER_INFO_VALIDATION,
          payload: false,
        });
      });
  });
};

export const signOut = (dispatch) => dispatch({ type: SIGN_OUT });
