
import _ from 'lodash';

import {
  LATESTSTUDIOARTICLES_INVALID,
  LATESTSTUDIOARTICLES_REQUESTING,
  LATESTSTUDIOARTICLES_FAILURE,
  LATESTSTUDIOARTICLES_SUCCESS,
} from './action';

const initialState = {
  readyStatus: LATESTSTUDIOARTICLES_INVALID,
  err: null,
  list: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LATESTSTUDIOARTICLES_REQUESTING:
      return _.assign({}, state, { readyStatus: LATESTSTUDIOARTICLES_REQUESTING });
    case LATESTSTUDIOARTICLES_FAILURE:
      return _.assign({}, state, {
        readyStatus: LATESTSTUDIOARTICLES_FAILURE,
        err: action.err,
      });
    case LATESTSTUDIOARTICLES_SUCCESS:
      return _.assign({}, state, {
        readyStatus: LATESTSTUDIOARTICLES_SUCCESS,
        list: action.data,
      });
    default:
      return state;
  }
};
