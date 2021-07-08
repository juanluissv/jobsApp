import {
  JOBS_LIST_REQUEST,
  JOBS_LIST_SUCCESS,
  JOBS_LIST_FAIL,
  SET_QUERIES,
} from '../constants/jobsConstants';
import { axios } from '../../services/api';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const getJobs =
  ({
    countryId,
    condition,
    tags,
    page,
    pageSize,
    search,
    sortBy,
    sortFrom,
    full_time,
    presency,
    closed_jobs,
  }) =>
  async (dispatch) => {
    const myurl = `${BACKEND_URL}/jobs?countryId=${countryId}&search=${search}&condition=${condition}&page=${page}&pageSize=${pageSize}&closed_jobs${closed_jobs}
    &tags=${tags.join(
      ','
    )}&sortBy=${sortBy}&sortFrom=${sortFrom}&full_time=${full_time}&presency=${presency}`;

    try {
      dispatch({
        type: SET_QUERIES,
        payload: {
          countryId,
          condition,
          tags,
          page,
          pageSize,
          search,
          sortBy,
          sortFrom,
          full_time,
          presency,
          closed_jobs,
        },
      });

      dispatch({
        type: JOBS_LIST_REQUEST,
      });

      const { data } = await axios.get(myurl);

      dispatch({
        type: JOBS_LIST_SUCCESS,
        payload: data,
        totalCount: data.totalCount,
      });
    } catch (error) {
      dispatch({
        type: JOBS_LIST_FAIL,
        payload: error.response,
      });
    }
  };
