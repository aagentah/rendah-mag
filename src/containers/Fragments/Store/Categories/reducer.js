
import _ from 'lodash';

import {
  CATEGORIES_INVALID,
  CATEGORIES_REQUESTING,
  CATEGORIES_FAILURE,
  CATEGORIES_SUCCESS,
} from './action';

const initialState = {
  readyStatus: CATEGORIES_INVALID,
  err: null,
  list: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CATEGORIES_REQUESTING:
      return _.assign({}, state, { readyStatus: CATEGORIES_REQUESTING });
    case CATEGORIES_FAILURE:
      return _.assign({}, state, {
        readyStatus: CATEGORIES_FAILURE,
        err: action.err,
      });
    case CATEGORIES_SUCCESS:
      return _.assign({}, state, {
        readyStatus: CATEGORIES_SUCCESS,
        list: action.data,
      });
    default:
      return state;
  }
};
