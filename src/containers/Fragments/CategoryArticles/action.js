
export const CATEGORYARTICLES_INVALID = 'CATEGORYARTICLES_INVALID';
export const CATEGORYARTICLES_REQUESTING = 'CATEGORYARTICLES_REQUESTING';
export const CATEGORYARTICLES_FAILURE = 'CATEGORYARTICLES_FAILURE';
export const CATEGORYARTICLES_SUCCESS = 'CATEGORYARTICLES_SUCCESS';

export const API_URL = '/api/category';

// Export this for unit testing more easily
export const fetchCategoryArticles = (query: string, axios: any, URL: string = API_URL) =>
  (dispatch) => {
    dispatch({ type: CATEGORYARTICLES_REQUESTING });

    return axios.get(URL, { params: { categoryQuery: query } })
      .then(res => dispatch({ type: CATEGORYARTICLES_SUCCESS, data: res.data }))
      .catch(err => dispatch({ type: CATEGORYARTICLES_FAILURE, err: err.message }));
  };

// Preventing dobule fetching data
/* istanbul ignore next */
const shouldFetchCategoryArticles = (state): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true; // Next line = Preventing double fetching data
  if (state.categoryArticles.readyStatus === CATEGORYARTICLES_SUCCESS) return false;
  return true;
};

/* istanbul ignore next */
export const fetchCategoryArticlesIfNeeded = (query: string) =>
  (dispatch, getState, axios: any) => {
    /* istanbul ignore next */
    if (shouldFetchCategoryArticles(getState())) {
      /* istanbul ignore next */
      return dispatch(fetchCategoryArticles(query, axios));
    }

    /* istanbul ignore next */
    return null;
  };
