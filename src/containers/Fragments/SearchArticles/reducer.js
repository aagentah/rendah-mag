
import _ from 'lodash';

import {
  SEARCHARTICLES_INVALID,
  SEARCHARTICLES_REQUESTING,
  SEARCHARTICLES_FAILURE,
  SEARCHARTICLES_SUCCESS,
} from './action';

const initialState = {
  readyStatus: SEARCHARTICLES_INVALID,
  err: null,
  list: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCHARTICLES_REQUESTING:
      return _.assign({}, state, { readyStatus: SEARCHARTICLES_REQUESTING });
    case SEARCHARTICLES_FAILURE:
      return _.assign({}, state, {
        readyStatus: SEARCHARTICLES_FAILURE,
        err: action.err,
      });
    case SEARCHARTICLES_SUCCESS:
      return _.assign({}, state, {
        readyStatus: SEARCHARTICLES_SUCCESS,
        list: action.data,
      });
    default:
      return state;
  }
};
