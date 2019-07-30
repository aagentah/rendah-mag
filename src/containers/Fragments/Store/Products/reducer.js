
import _ from 'lodash';

import {
  PRODUCTS_INVALID,
  PRODUCTS_REQUESTING,
  PRODUCTS_FAILURE,
  PRODUCTS_SUCCESS,
} from './action';

const initialState = {
  readyStatus: PRODUCTS_INVALID,
  err: null,
  list: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PRODUCTS_REQUESTING:
      return _.assign({}, state, { readyStatus: PRODUCTS_REQUESTING });
    case PRODUCTS_FAILURE:
      return _.assign({}, state, {
        readyStatus: PRODUCTS_FAILURE,
        err: action.err,
      });
    case PRODUCTS_SUCCESS:
      return _.assign({}, state, {
        readyStatus: PRODUCTS_SUCCESS,
        list: action.data,
      });
    default:
      return state;
  }
};
