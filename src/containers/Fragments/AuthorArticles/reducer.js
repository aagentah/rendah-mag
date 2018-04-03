
import _ from 'lodash';

import {
  AUTHORARTICLES_INVALID,
  AUTHORARTICLES_REQUESTING,
  AUTHORARTICLES_FAILURE,
  AUTHORARTICLES_SUCCESS,
} from './action';

const initialState = {
  readyStatus: AUTHORARTICLES_INVALID,
  err: null,
  list: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHORARTICLES_REQUESTING:
      return _.assign({}, state, { readyStatus: AUTHORARTICLES_REQUESTING });
    case AUTHORARTICLES_FAILURE:
      return _.assign({}, state, {
        readyStatus: AUTHORARTICLES_FAILURE,
        err: action.err,
      });
    case AUTHORARTICLES_SUCCESS:
      return _.assign({}, state, {
        readyStatus: AUTHORARTICLES_SUCCESS,
        list: action.data,
      });
    default:
      return state;
  }
};
