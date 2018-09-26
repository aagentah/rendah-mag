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

    // const query =
    // `*[_type == "post"] | order(publishedAt desc) [${params.limit}] {
    //   ...,
    //   author->,
    //   category->,
    //   "mainImage": mainImage.asset->url,
    // }`;

    // const query =
    // `*[_type == "post"] [${params.limit}] | order(_createdAt desc) {
    //   title,
    //   description,
    //   "slug": slug.current,
    //   "img": mainImage.asset->url,
    //   "author": author->name,
    //   "created": _createdAt,
    // }`;

    const query = `*[_type == "author" && slug.current == $authorId] [0] {
      name,
      alias,
      description,
      "img": image.asset->url,
      "slug": slug.current,
      socialHandles,
    }`;

    sanity.fetch(query, params).then((res) => {
      // dispatch({ type: LATEST_ARTICLES, articlesLatest });
      // resolve(articlesLatest);

      if (res) {
        dispatch({ type: AUTHOR_SUCCESS, authorId, data: res });
      } else {
        dispatch({ type: AUTHOR_FAILURE, authorId, err: 'error' });
      }

      // return axios.get(URL, { params: { limit } })
      //   .then(res => dispatch({ type: AUTHORARTICLES_SUCCESS, data: res.data }))
      //   .catch(err => dispatch({ type: AUTHORARTICLES_FAILURE, err: err.message }));
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
