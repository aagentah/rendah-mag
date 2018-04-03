
export const AUTHOR_REQUESTING = 'AUTHOR_REQUESTING';
export const AUTHOR_FAILURE = 'AUTHOR_FAILURE';
export const AUTHOR_SUCCESS = 'AUTHOR_SUCCESS';

// export const API_URL = 'https://jsonplaceholder.typicode.com/authors';
export const API_URL = '/api/author';

// Export this for unit testing more easily
export const fetchAuthor = (authorId: string, axios: any, URL: string = API_URL) =>
  (dispatch) => {
    dispatch({ type: AUTHOR_REQUESTING, authorId });

    return axios.get(URL, { params: { title: authorId } })
      .then(res => dispatch({ type: AUTHOR_SUCCESS, authorId, data: res.data }))
      .catch(err => dispatch({ type: AUTHOR_FAILURE, authorId, err: err.message }));
  };

// Using for preventing dobule fetching data
/* istanbul ignore next */
const shouldFetchAuthor = (state, authorId: string): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true;
  const authorInfo = state.authorInfo[authorId];
  // Preventing dobule fetching data in production
  if (authorInfo && authorInfo.readyStatus === AUTHOR_SUCCESS) return false;
  return true;
};

/* istanbul ignore next */
export const fetchAuthorIfNeeded = (authorId: string) =>
  (dispatch, getState, axios: any) => {
    /* istanbul ignore next */
    if (shouldFetchAuthor(getState(), authorId)) {
      /* istanbul ignore next */
      return dispatch(fetchAuthor(authorId, axios));
    }

    /* istanbul ignore next */
    return null;
  };
