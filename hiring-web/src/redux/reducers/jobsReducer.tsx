import {
  JOBS_LIST_REQUEST,
  JOBS_LIST_SUCCESS,
  JOBS_LIST_FAIL,
  SET_QUERIES,
} from '../constants/jobsConstants';

const initialState = {
  queries: {
    page: 0,
    pageSize: 8,
    condition: '',
    full_time: '',
    presency: '',
    sortBy: 'id',
    sortFrom: 'ASC',
    countryId: '',
    search: '',
    tags: [],
    closed_jobs: 'false',
  },
  jobs: [],
};

export const jobsListReducer = (state = initialState, action) => {
  switch (action.type) {
    case JOBS_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        jobs: [],
      };
    case JOBS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        jobs: action.payload,
        totalCount: action.totalCount,
      };
    case JOBS_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SET_QUERIES:
      return {
        ...state,
        queries: action.payload,
      };
    default:
      return state;
  }
};
