
import _ from 'lodash';

import {
  CATEGORYARTICLES_INVALID,
  CATEGORYARTICLES_REQUESTING,
  CATEGORYARTICLES_FAILURE,
  CATEGORYARTICLES_SUCCESS,
} from './action';

const initialState = {
  readyStatus: CATEGORYARTICLES_INVALID,
  err: null,
  list: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CATEGORYARTICLES_REQUESTING:
      return _.assign({}, state, { readyStatus: CATEGORYARTICLES_REQUESTING });
    case CATEGORYARTICLES_FAILURE:
      return _.assign({}, state, {
        readyStatus: CATEGORYARTICLES_FAILURE,
        err: action.err,
      });
    case CATEGORYARTICLES_SUCCESS:
      return _.assign({}, state, {
        readyStatus: CATEGORYARTICLES_SUCCESS,
        list: action.data,
      });
    default:
      return state;
  }
};
