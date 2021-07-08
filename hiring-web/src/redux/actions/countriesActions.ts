import {
  COUNTRIES_LIST_REQUEST,
  COUNTRIES_LIST_SUCCESS,
  COUNTRIES_LIST_FAIL,
} from '../constants/countriesConstants';
import { axios } from '../../services/api';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const getCountries = () => async (dispatch) => {
  try {
    dispatch({
      type: COUNTRIES_LIST_REQUEST,
    });

    const { data } = await axios.get(`${BACKEND_URL}/countries`);

    dispatch({
      type: COUNTRIES_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COUNTRIES_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
