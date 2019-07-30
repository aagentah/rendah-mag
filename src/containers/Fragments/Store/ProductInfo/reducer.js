
import _ from 'lodash';

import {
  PRODUCT_REQUESTING,
  PRODUCT_FAILURE,
  PRODUCT_SUCCESS,
} from './action';

export default (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_REQUESTING:
      return _.assign({}, state, {
        [action.productId]: {
          readyStatus: PRODUCT_REQUESTING,
        },
      });
    case PRODUCT_FAILURE:
      return _.assign({}, state, {
        [action.productId]: {
          readyStatus: PRODUCT_FAILURE,
          err: action.err,
        },
      });
    case PRODUCT_SUCCESS:
      return _.assign({}, state, {
        [action.productId]: {
          readyStatus: PRODUCT_SUCCESS,
          info: action.data,
        },
      });
    default:
      return state;
  }
};
