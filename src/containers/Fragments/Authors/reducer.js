
import _ from 'lodash';

import {
  AUTHORS_INVALID,
  AUTHORS_REQUESTING,
  AUTHORS_FAILURE,
  AUTHORS_SUCCESS,
} from './action';

const initialState = {
  readyStatus: AUTHORS_INVALID,
  err: null,
  list: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHORS_REQUESTING:
      return _.assign({}, state, { readyStatus: AUTHORS_REQUESTING });
    case AUTHORS_FAILURE:
      return _.assign({}, state, {
        readyStatus: AUTHORS_FAILURE,
        err: action.err,
      });
    case AUTHORS_SUCCESS:
      return _.assign({}, state, {
        readyStatus: AUTHORS_SUCCESS,
        list: action.data,
      });
    default:
      return state;
  }
};
