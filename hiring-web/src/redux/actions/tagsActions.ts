import {
  TAGS_LIST_REQUEST,
  TAGS_LIST_SUCCESS,
  TAGS_LIST_FAIL,
} from '../constants/tagsConstants';
import { axios } from '../../services/api';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const getTags = () => async (dispatch) => {
  try {
    dispatch({
      type: TAGS_LIST_REQUEST,
    });

    const { data } = await axios.get(`${BACKEND_URL}/tags`);

    dispatch({
      type: TAGS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TAGS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
