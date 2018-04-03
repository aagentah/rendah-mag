
import _ from 'lodash';

import {
  LATESTARTICLES_INVALID,
  LATESTARTICLES_REQUESTING,
  LATESTARTICLES_FAILURE,
  LATESTARTICLES_SUCCESS,
} from './action';

const initialState = {
  readyStatus: LATESTARTICLES_INVALID,
  err: null,
  list: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LATESTARTICLES_REQUESTING:
      return _.assign({}, state, { readyStatus: LATESTARTICLES_REQUESTING });
    case LATESTARTICLES_FAILURE:
      return _.assign({}, state, {
        readyStatus: LATESTARTICLES_FAILURE,
        err: action.err,
      });
    case LATESTARTICLES_SUCCESS:
      return _.assign({}, state, {
        readyStatus: LATESTARTICLES_SUCCESS,
        list: action.data,
      });
    default:
      return state;
  }
};
