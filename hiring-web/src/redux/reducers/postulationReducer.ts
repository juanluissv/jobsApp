import {
  POSTULATION_REQUEST,
  POSTULATION_SUCCESS,
  POSTULATION_FAIL,
  POSTULATION_INFO,
  POSTULATION_INFO_FAIL,
} from '../constants/postulationConstants';

const initialState = {
  postulationInfo: {},
};

const postulationReducer = (state = initialState, action) => {
  switch (action.type) {
    case POSTULATION_REQUEST:
      return { ...state, loading: true };
    case POSTULATION_SUCCESS:
      return { ...state, loading: false, postulationInfo: action.payload };
    case POSTULATION_FAIL:
      return { ...state, loading: false, error: action.payload };
    case POSTULATION_INFO:
      return { ...state, infoFormPostulation: action.payload };
    case POSTULATION_INFO_FAIL:
      return { ...state, infoFormPostulation: null };
    default:
      return state;
  }
};

export default postulationReducer;
