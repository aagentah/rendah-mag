
import _ from 'lodash';

import {
  AUTHOR_REQUESTING,
  AUTHOR_FAILURE,
  AUTHOR_SUCCESS,
} from './action';

export default (state = {}, action) => {
  switch (action.type) {
    case AUTHOR_REQUESTING:
      return _.assign({}, state, {
        [action.authorId]: {
          readyStatus: AUTHOR_REQUESTING,
        },
      });
    case AUTHOR_FAILURE:
      return _.assign({}, state, {
        [action.authorId]: {
          readyStatus: AUTHOR_FAILURE,
          err: action.err,
        },
      });
    case AUTHOR_SUCCESS:
      return _.assign({}, state, {
        [action.authorId]: {
          readyStatus: AUTHOR_SUCCESS,
          info: action.data,
        },
      });
    default:
      return state;
  }
};
