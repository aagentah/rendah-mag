
import _ from 'lodash';

import {
  ARTICLE_REQUESTING,
  ARTICLE_FAILURE,
  ARTICLE_SUCCESS,
} from './action';

export default (state = {}, action) => {
  switch (action.type) {
    case ARTICLE_REQUESTING:
      return _.assign({}, state, {
        [action.articleId]: {
          readyStatus: ARTICLE_REQUESTING,
        },
      });
    case ARTICLE_FAILURE:
      return _.assign({}, state, {
        [action.articleId]: {
          readyStatus: ARTICLE_FAILURE,
          err: action.err,
        },
      });
    case ARTICLE_SUCCESS:
      return _.assign({}, state, {
        [action.articleId]: {
          readyStatus: ARTICLE_SUCCESS,
          info: action.data,
        },
      });
    default:
      return state;
  }
};
