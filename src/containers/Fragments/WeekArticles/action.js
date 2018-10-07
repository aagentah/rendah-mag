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

    const query =
    `*[_type == "post"] | order(publishedAt desc) [${params.limit}] {
      title,
      description,
      "slug": slug.current,
      "img": image.asset->url,
      "author": author->name,
      "created": publishedAt,
    }`;

    return sanity.fetch(query).then((res) => {
      if (res) {
        dispatch({ type: WEEKARTICLES_SUCCESS, data: res });
      } else {
        dispatch({ type: WEEKARTICLES_FAILURE, err: 'error' });
      }
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
