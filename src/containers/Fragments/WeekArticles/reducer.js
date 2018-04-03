
import _ from 'lodash';

import {
  WEEKARTICLES_INVALID,
  WEEKARTICLES_REQUESTING,
  WEEKARTICLES_FAILURE,
  WEEKARTICLES_SUCCESS,
} from './action';

const initialState = {
  readyStatus: WEEKARTICLES_INVALID,
  err: null,
  list: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case WEEKARTICLES_REQUESTING:
      return _.assign({}, state, { readyStatus: WEEKARTICLES_REQUESTING });
    case WEEKARTICLES_FAILURE:
      return _.assign({}, state, {
        readyStatus: WEEKARTICLES_FAILURE,
        err: action.err,
      });
    case WEEKARTICLES_SUCCESS:
      return _.assign({}, state, {
        readyStatus: WEEKARTICLES_SUCCESS,
        list: action.data,
      });
    default:
      return state;
  }
};
