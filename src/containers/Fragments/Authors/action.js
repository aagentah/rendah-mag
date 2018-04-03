
export const AUTHORS_INVALID = 'AUTHORS_INVALID';
export const AUTHORS_REQUESTING = 'AUTHORS_REQUESTING';
export const AUTHORS_FAILURE = 'AUTHORS_FAILURE';
export const AUTHORS_SUCCESS = 'AUTHORS_SUCCESS';

export const API_URL = '/api/authors';

// Export this for unit testing more easily
export const fetchAuthors = (axios: any, URL: string = API_URL) =>
  (dispatch) => {
    dispatch({ type: AUTHORS_REQUESTING });

    return axios.get(URL)
      .then(res => dispatch({ type: AUTHORS_SUCCESS, data: res.data }))
      .catch(err => dispatch({ type: AUTHORS_FAILURE, err: err.message }));
  };

// Preventing dobule fetching data
/* istanbul ignore next */
const shouldFetchAuthors = (state): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true; // Next line = Preventing double fetching data
  if (state.authors.readyStatus === AUTHORS_SUCCESS) return false;
  return true;
};

/* istanbul ignore next */
export const fetchAuthorsIfNeeded = () =>
  (dispatch, getState, axios: any) => {
    /* istanbul ignore next */
    if (shouldFetchAuthors(getState())) {
      /* istanbul ignore next */
      return dispatch(fetchAuthors(axios));
    }

    /* istanbul ignore next */
    return null;
  };
