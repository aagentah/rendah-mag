
import _ from 'lodash';

import {
  FEATUREDARTICLES_INVALID,
  FEATUREDARTICLES_REQUESTING,
  FEATUREDARTICLES_FAILURE,
  FEATUREDARTICLES_SUCCESS,
} from './action';

const initialState = {
  readyStatus: FEATUREDARTICLES_INVALID,
  err: null,
  list: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FEATUREDARTICLES_REQUESTING:
      return _.assign({}, state, { readyStatus: FEATUREDARTICLES_REQUESTING });
    case FEATUREDARTICLES_FAILURE:
      return _.assign({}, state, {
        readyStatus: FEATUREDARTICLES_FAILURE,
        err: action.err,
      });
    case FEATUREDARTICLES_SUCCESS:
      return _.assign({}, state, {
        readyStatus: FEATUREDARTICLES_SUCCESS,
        list: action.data,
      });
    default:
      return state;
  }
};
