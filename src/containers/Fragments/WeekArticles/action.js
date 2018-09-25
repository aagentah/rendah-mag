import sanity from '../../../utils/sanity';

export const WEEKARTICLES_INVALID = 'WEEKARTICLES_INVALID';
export const WEEKARTICLES_REQUESTING = 'WEEKARTICLES_REQUESTING';
export const WEEKARTICLES_FAILURE = 'WEEKARTICLES_FAILURE';
export const WEEKARTICLES_SUCCESS = 'WEEKARTICLES_SUCCESS';

// export const API_URL = (__DEV__) ?
//   '/api/week' : 'https://rendah-mag.herokuapp.com/api/week';

export const fetchWeekArticles = () =>
  (dispatch) => {
    dispatch({ type: WEEKARTICLES_REQUESTING });

    const params = {
      limit: '0..1',
    };

    // const query =
    // `*[_type == "post"] | order(publishedAt desc) [${params.limit}] {
    //   ...,
    //   author->,
    //   category->,
    //   "mainImage": mainImage.asset->url,
    // }`;

    const query =
    `*[_type == "post"] | order(_createdAt desc) [${params.limit}] {
      title,
      description,
      "slug": slug.current,
      "img": mainImage.asset->url,
      "author": author->name,
      "created": _createdAt,
    }`;

    sanity.fetch(query).then((res) => {
      // dispatch({ type: LATEST_ARTICLES, articlesLatest });
      // resolve(articlesLatest);
      console.log('sanity fetch');
      console.log(res);

      if (res) {
        dispatch({ type: WEEKARTICLES_SUCCESS, data: res });
      } else {
        dispatch({ type: WEEKARTICLES_FAILURE, err: 'error' });
      }

      // return axios.get(URL, { params: { limit } })
      //   .then(res => dispatch({ type: LATESTARTICLES_SUCCESS, data: res.data }))
      //   .catch(err => dispatch({ type: LATESTARTICLES_FAILURE, err: err.message }));
    });
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
