
import _ from 'lodash';

import {
  TEAM_INVALID,
  TEAM_REQUESTING,
  TEAM_FAILURE,
  TEAM_SUCCESS,
} from './action';

const initialState = {
  readyStatus: TEAM_INVALID,
  err: null,
  list: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TEAM_REQUESTING:
      return _.assign({}, state, { readyStatus: TEAM_REQUESTING });
    case TEAM_FAILURE:
      return _.assign({}, state, {
        readyStatus: TEAM_FAILURE,
        err: action.err,
      });
    case TEAM_SUCCESS:
      return _.assign({}, state, {
        readyStatus: TEAM_SUCCESS,
        list: action.data,
      });
    default:
      return state;
  }
};
