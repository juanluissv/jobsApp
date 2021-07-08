import {
  TAGS_LIST_REQUEST,
  TAGS_LIST_SUCCESS,
  TAGS_LIST_FAIL,
} from '../constants/tagsConstants';

export const tagsReducer = (state = { tags: [] }, action) => {
  switch (action.type) {
    case TAGS_LIST_REQUEST:
      return {
        tags: [],
      };
    case TAGS_LIST_SUCCESS:
      return {
        tags: action.payload,
      };
    case TAGS_LIST_FAIL:
      return {
        error: action.payload,
      };
    default:
      return state;
  }
};
