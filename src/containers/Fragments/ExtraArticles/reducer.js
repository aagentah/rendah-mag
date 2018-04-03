
import _ from 'lodash';

import {
  EXTRAARTICLES_INVALID,
  EXTRAARTICLES_REQUESTING,
  EXTRAARTICLES_FAILURE,
  EXTRAARTICLES_SUCCESS,
} from './action';

const initialState = {
  readyStatus: EXTRAARTICLES_INVALID,
  err: null,
  list: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case EXTRAARTICLES_REQUESTING:
      return _.assign({}, state, { readyStatus: EXTRAARTICLES_REQUESTING });
    case EXTRAARTICLES_FAILURE:
      return _.assign({}, state, {
        readyStatus: EXTRAARTICLES_FAILURE,
        err: action.err,
      });
    case EXTRAARTICLES_SUCCESS:
      return _.assign({}, state, {
        readyStatus: EXTRAARTICLES_SUCCESS,
        list: action.data,
      });
    default:
      return state;
  }
};
