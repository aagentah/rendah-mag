
import _ from 'lodash';

import {
  COLLECTIONS_INVALID,
  COLLECTIONS_REQUESTING,
  COLLECTIONS_FAILURE,
  COLLECTIONS_SUCCESS,
} from './action';

const initialState = {
  readyStatus: COLLECTIONS_INVALID,
  err: null,
  list: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case COLLECTIONS_REQUESTING:
      return _.assign({}, state, { readyStatus: COLLECTIONS_REQUESTING });
    case COLLECTIONS_FAILURE:
      return _.assign({}, state, {
        readyStatus: COLLECTIONS_FAILURE,
        err: action.err,
      });
    case COLLECTIONS_SUCCESS:
      return _.assign({}, state, {
        readyStatus: COLLECTIONS_SUCCESS,
        list: action.data,
      });
    default:
      return state;
  }
};
