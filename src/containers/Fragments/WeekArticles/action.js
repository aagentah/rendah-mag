
export const WEEKARTICLES_INVALID = 'WEEKARTICLES_INVALID';
export const WEEKARTICLES_REQUESTING = 'WEEKARTICLES_REQUESTING';
export const WEEKARTICLES_FAILURE = 'WEEKARTICLES_FAILURE';
export const WEEKARTICLES_SUCCESS = 'WEEKARTICLES_SUCCESS';

export const API_URL = '/api/week';

// Export this for unit testing more easily
export const fetchWeekArticles = (axios: any, URL: string = API_URL) =>
  (dispatch) => {
    dispatch({ type: WEEKARTICLES_REQUESTING });

    return axios.get(URL)
      .then(res => dispatch({ type: WEEKARTICLES_SUCCESS, data: res.data }))
      .catch(err => dispatch({ type: WEEKARTICLES_FAILURE, err: err.message }));
  };

// Preventing dobule fetching data
/* istanbul ignore next */
const shouldFetchWeekArticles = (state): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true; // Next line = Preventing double fetching data
  if (state.weekArticles.readyStatus === WEEKARTICLES_SUCCESS) return false;
  return true;
};

/* istanbul ignore next */
export const fetchWeekArticlesIfNeeded = () =>
  (dispatch, getState, axios: any) => {
    /* istanbul ignore next */
    if (shouldFetchWeekArticles(getState())) {
      /* istanbul ignore next */
      return dispatch(fetchWeekArticles(axios));
    }

    /* istanbul ignore next */
    return null;
  };
