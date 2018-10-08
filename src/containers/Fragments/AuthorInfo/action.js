import sanity from '../../../utils/sanity';

export const AUTHOR_REQUESTING = 'AUTHOR_REQUESTING';
export const AUTHOR_FAILURE = 'AUTHOR_FAILURE';
export const AUTHOR_SUCCESS = 'AUTHOR_SUCCESS';

// export const API_URL = (__DEV__) ?
//   '/api/author' : 'https://rendah-mag.herokuapp.com/api/author';

export const fetchAuthor = (authorId: string) =>
  (dispatch) => {
    dispatch({ type: AUTHOR_REQUESTING, authorId });

    const params = {
      limit: '0..23',
      authorId,
    };

    const query = `*[_type == "author" && slug.current == $authorId] [0] {
      name,
      alias,
      description,
      "img": image.asset->url,
      "slug": slug.current,
      socialHandles,
    }`;

    return sanity.fetch(query, params).then((res) => {
      if (res) {
        dispatch({ type: AUTHOR_SUCCESS, authorId, data: res });
      } else {
        dispatch({ type: AUTHOR_FAILURE, authorId, err: 'error' });
      }
    });
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
export const fetchAuthorIfNeeded = (authorId: string) => (dispatch, getState) => {
  /* istanbul ignore next */
  if (shouldFetchAuthor(getState(), authorId)) {
    /* istanbul ignore next */
    return dispatch(fetchAuthor(authorId));
  }

  /* istanbul ignore next */
  return Promise.resolve();
};
