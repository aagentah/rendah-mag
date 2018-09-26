import sanity from '../../../utils/sanity';

export const AUTHORS_INVALID = 'AUTHORS_INVALID';
export const AUTHORS_REQUESTING = 'AUTHORS_REQUESTING';
export const AUTHORS_FAILURE = 'AUTHORS_FAILURE';
export const AUTHORS_SUCCESS = 'AUTHORS_SUCCESS';

// export const API_URL = (__DEV__) ?
//   '/api/authors' : 'https://rendah-mag.herokuapp.com/api/authors';

export const fetchAuthors = () =>
  (dispatch) => {
    dispatch({ type: AUTHORS_REQUESTING });

    const params = {
      limit: '0..23',
    };

    // const query =
    // `*[_type == "post"] | order(publishedAt desc) [${params.limit}] {
    //   ...,
    //   author->,
    //   category->,
    //   "mainImage": mainImage.asset->url,
    // }`;

    const query =
    `*[_type == "author"] | order(_createdAt desc) [${params.limit}] {
      name,
      alias,
      description,
      "slug": slug.current,
      "img": image.asset->url,
    }`;

    sanity.fetch(query).then((res) => {
      // dispatch({ type: LATEST_ARTICLES, articlesLatest });
      // resolve(articlesLatest);
      console.log('sanity fetch');
      console.log(res);

      if (res) {
        dispatch({ type: AUTHORS_SUCCESS, data: res });
      } else {
        dispatch({ type: AUTHORS_FAILURE, err: 'error' });
      }

      // return axios.get(URL, { params: { limit } })
      //   .then(res => dispatch({ type: LATESTARTICLES_SUCCESS, data: res.data }))
      //   .catch(err => dispatch({ type: LATESTARTICLES_FAILURE, err: err.message }));
    });
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
