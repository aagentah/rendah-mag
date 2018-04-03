
export const AUTHORARTICLES_INVALID = 'AUTHORARTICLES_INVALID';
export const AUTHORARTICLES_REQUESTING = 'AUTHORARTICLES_REQUESTING';
export const AUTHORARTICLES_FAILURE = 'AUTHORARTICLES_FAILURE';
export const AUTHORARTICLES_SUCCESS = 'AUTHORARTICLES_SUCCESS';

export const API_URL = '/api/authorArticles';

// Export this for unit testing more easily
export const fetchAuthorArticles = (query: string, axios: any, URL: string = API_URL) =>
  (dispatch) => {
    dispatch({ type: AUTHORARTICLES_REQUESTING });

    return axios.get(URL, { params: { authorQuery: query } })
      .then(res => dispatch({ type: AUTHORARTICLES_SUCCESS, data: res.data }))
      .catch(err => dispatch({ type: AUTHORARTICLES_FAILURE, err: err.message }));
  };

// Preventing dobule fetching data
/* istanbul ignore next */
const shouldFetchAuthorArticles = (state): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true; // Next line = Preventing double fetching data
  if (state.authorArticles.readyStatus === AUTHORARTICLES_SUCCESS) return false;
  return true;
};

/* istanbul ignore next */
export const fetchAuthorArticlesIfNeeded = (query: string) =>
  (dispatch, getState, axios: any) => {
    /* istanbul ignore next */
    if (shouldFetchAuthorArticles(getState())) {
      /* istanbul ignore next */
      return dispatch(fetchAuthorArticles(query, axios));
    }

    /* istanbul ignore next */
    return null;
  };
