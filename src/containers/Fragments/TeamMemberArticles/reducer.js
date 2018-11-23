
import _ from 'lodash';

import {
  TEAMMEMBERARTICLES_INVALID,
  TEAMMEMBERARTICLES_REQUESTING,
  TEAMMEMBERARTICLES_FAILURE,
  TEAMMEMBERARTICLES_SUCCESS,
} from './action';

const initialState = {
  readyStatus: TEAMMEMBERARTICLES_INVALID,
  err: null,
  list: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TEAMMEMBERARTICLES_REQUESTING:
      return _.assign({}, state, { readyStatus: TEAMMEMBERARTICLES_REQUESTING });
    case TEAMMEMBERARTICLES_FAILURE:
      return _.assign({}, state, {
        readyStatus: TEAMMEMBERARTICLES_FAILURE,
        err: action.err,
      });
    case TEAMMEMBERARTICLES_SUCCESS:
      return _.assign({}, state, {
        readyStatus: TEAMMEMBERARTICLES_SUCCESS,
        list: action.data,
      });
    default:
      return state;
  }
};
