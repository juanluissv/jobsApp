import {
  COUNTRIES_LIST_REQUEST,
  COUNTRIES_LIST_SUCCESS,
  COUNTRIES_LIST_FAIL,
} from '../constants/countriesConstants';

export const countriesListReducer = (state = { countries: [] }, action) => {
  switch (action.type) {
    case COUNTRIES_LIST_REQUEST:
      return {
        countries: [],
      };
    case COUNTRIES_LIST_SUCCESS:
      return {
        countries: action.payload,
      };
    case COUNTRIES_LIST_FAIL:
      return {
        error: action.payload,
      };
    default:
      return state;
  }
};
