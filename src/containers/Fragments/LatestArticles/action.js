
export const LATESTARTICLES_INVALID = 'LATESTARTICLES_INVALID';
export const LATESTARTICLES_REQUESTING = 'LATESTARTICLES_REQUESTING';
export const LATESTARTICLES_FAILURE = 'LATESTARTICLES_FAILURE';
export const LATESTARTICLES_SUCCESS = 'LATESTARTICLES_SUCCESS';

export const API_URL = (__DEV__) ?
  '/api/articles' : 'https://rendah-mag.herokuapp.com/api/articles';


export const fetchLatestArticles = (limit: number, axios: any, URL: string = API_URL) =>
  (dispatch) => {
    dispatch({ type: LATESTARTICLES_REQUESTING });

    return axios.get(URL, { params: { limit } })
      .then(res => dispatch({ type: LATESTARTICLES_SUCCESS, data: res.data }))
      .catch(err => dispatch({ type: LATESTARTICLES_FAILURE, err: err.message }));
  };

// Preventing dobule fetching data
/* istanbul ignore next */
const shouldFetchLatestArticles = (state): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true; // Next line = Preventing double fetching data
  if (state.latestArticles.readyStatus === LATESTARTICLES_SUCCESS) return false;
  return true;
};

/* istanbul ignore next */
export const fetchLatestArticlesIfNeeded = (limit: number) =>
  (dispatch, getState, axios: any) => {
    /* istanbul ignore next */
    if (shouldFetchLatestArticles(getState())) {
      /* istanbul ignore next */
      return dispatch(fetchLatestArticles(limit, axios));
    }

    /* istanbul ignore next */
    return null;
  };
