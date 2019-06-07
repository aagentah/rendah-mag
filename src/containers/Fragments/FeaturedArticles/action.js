import sanity from '../../../utils/sanity';

export const FEATUREDARTICLES_INVALID = 'FEATUREDARTICLES_INVALID';
export const FEATUREDARTICLES_REQUESTING = 'FEATUREDARTICLES_REQUESTING';
export const FEATUREDARTICLES_FAILURE = 'FEATUREDARTICLES_FAILURE';
export const FEATUREDARTICLES_SUCCESS = 'FEATUREDARTICLES_SUCCESS';

// export const API_URL = (__DEV__) ?
//   '/api/featured' : 'https://rendah-mag.herokuapp.com/api/featured';

export const fetchFeaturedArticles = () =>
  (dispatch) => {
    dispatch({ type: FEATUREDARTICLES_REQUESTING });

    const query =
    `*[_type == "post" && featured == true] | order(publishedAt desc) [0] {
      title,
      description,
      "slug": slug.current,
      "img": image.asset->url,
      "teamMember": author->name,
      "created": publishedAt,
    }`;

    return sanity.fetch(query).then((res) => {
      if (res) {
        dispatch({ type: FEATUREDARTICLES_SUCCESS, data: res });
      } else {
        dispatch({ type: FEATUREDARTICLES_FAILURE, err: 'error' });
      }
    });
  };

// Preventing dobule fetching data
/* istanbul ignore next */
const shouldFetchFeaturedArticles = (state): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true; // Next line = Preventing double fetching data
  if (state.featuredArticles.readyStatus === FEATUREDARTICLES_SUCCESS) return false;
  return true;
};

/* istanbul ignore next */
export const fetchFeaturedArticlesIfNeeded = () => (dispatch, getState) => {
  /* istanbul ignore next */
  if (shouldFetchFeaturedArticles(getState())) {
    /* istanbul ignore next */
    return dispatch(fetchFeaturedArticles());
  }

  /* istanbul ignore next */
  return Promise.resolve();
};
