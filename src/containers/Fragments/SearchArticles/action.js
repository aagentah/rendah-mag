
export const SEARCHARTICLES_INVALID = 'SEARCHARTICLES_INVALID';
export const SEARCHARTICLES_REQUESTING = 'SEARCHARTICLES_REQUESTING';
export const SEARCHARTICLES_FAILURE = 'SEARCHARTICLES_FAILURE';
export const SEARCHARTICLES_SUCCESS = 'SEARCHARTICLES_SUCCESS';

export const API_URL = '/api/search';

// Export this for unit testing more easily
export const fetchSearchArticles = (query: string, axios: any, URL: string = API_URL) =>
  (dispatch) => {
    dispatch({ type: SEARCHARTICLES_REQUESTING });

    return axios.get(URL, { params: { searchQuery: query } })
      .then(res => dispatch({ type: SEARCHARTICLES_SUCCESS, data: res.data }))
      .catch(err => dispatch({ type: SEARCHARTICLES_FAILURE, err: err.message }));
  };

// Preventing dobule fetching data
/* istanbul ignore next */
const shouldFetchSearchArticles = (state): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true; // Next line = Preventing double fetching data
  if (state.searchArticles.readyStatus === SEARCHARTICLES_SUCCESS) return false;
  return true;
};

/* istanbul ignore next */
export const fetchSearchArticlesIfNeeded = (query: string) =>
  (dispatch, getState, axios: any) => {
    /* istanbul ignore next */
    if (shouldFetchSearchArticles(getState())) {
      /* istanbul ignore next */
      return dispatch(fetchSearchArticles(query, axios));
    }

    /* istanbul ignore next */
    return null;
  };
