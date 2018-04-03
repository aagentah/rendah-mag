
export const EXTRAARTICLES_INVALID = 'EXTRAARTICLES_INVALID';
export const EXTRAARTICLES_REQUESTING = 'EXTRAARTICLES_REQUESTING';
export const EXTRAARTICLES_FAILURE = 'EXTRAARTICLES_FAILURE';
export const EXTRAARTICLES_SUCCESS = 'EXTRAARTICLES_SUCCESS';

export const API_URL = '/api/extra';

// Export this for unit testing more easily
export const fetchExtraArticles = (axios: any, URL: string = API_URL) =>
  (dispatch) => {
    dispatch({ type: EXTRAARTICLES_REQUESTING });

    return axios.get(URL)
      .then(res => dispatch({ type: EXTRAARTICLES_SUCCESS, data: res.data }))
      .catch(err => dispatch({ type: EXTRAARTICLES_FAILURE, err: err.message }));
  };

// Preventing dobule fetching data
/* istanbul ignore next */
const shouldFetchExtraArticles = (state): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true; // Next line = Preventing double fetching data
  if (state.extraArticles.readyStatus === EXTRAARTICLES_SUCCESS) return false;
  return true;
};

/* istanbul ignore next */
export const fetchExtraArticlesIfNeeded = () =>
  (dispatch, getState, axios: any) => {
    /* istanbul ignore next */
    if (shouldFetchExtraArticles(getState())) {
      /* istanbul ignore next */
      return dispatch(fetchExtraArticles(axios));
    }

    /* istanbul ignore next */
    return null;
  };
