
import _ from 'lodash';

import {
  TEAMMEMBER_REQUESTING,
  TEAMMEMBER_FAILURE,
  TEAMMEMBER_SUCCESS,
} from './action';

export default (state = {}, action) => {
  switch (action.type) {
    case TEAMMEMBER_REQUESTING:
      return _.assign({}, state, {
        [action.teamMemberId]: {
          readyStatus: TEAMMEMBER_REQUESTING,
        },
      });
    case TEAMMEMBER_FAILURE:
      return _.assign({}, state, {
        [action.teamMemberId]: {
          readyStatus: TEAMMEMBER_FAILURE,
          err: action.err,
        },
      });
    case TEAMMEMBER_SUCCESS:
      return _.assign({}, state, {
        [action.teamMemberId]: {
          readyStatus: TEAMMEMBER_SUCCESS,
          info: action.data,
        },
      });
    default:
      return state;
  }
};
