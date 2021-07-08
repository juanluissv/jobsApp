import {
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  GET_USER_INFO,
  SIGN_OUT,
  USER_INFO_VALIDATION,
} from '../constants/userConstants';

const initialState = {
  userInfo: {},
};

const userUpdateReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { ...state, loading: true };
    case USER_UPDATE_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload };
    case USER_UPDATE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case GET_USER_INFO:
      return { ...state, loading: false, userInfo: action.payload };
    case SIGN_OUT:
      return { ...state, loading: false, userInfo: initialState };
    case USER_INFO_VALIDATION:
      return { ...state, loading: false, userInfoValidated: action.payload };
    default:
      return state;
  }
};

export default userUpdateReducer;
