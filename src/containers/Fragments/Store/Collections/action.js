import sanity from '../../../../utils/sanity-store';

export const COLLECTIONS_INVALID = 'COLLECTIONS_INVALID';
export const COLLECTIONS_REQUESTING = 'COLLECTIONS_REQUESTING';
export const COLLECTIONS_FAILURE = 'COLLECTIONS_FAILURE';
export const COLLECTIONS_SUCCESS = 'COLLECTIONS_SUCCESS';

// export const API_URL = (__DEV__) ?
//   '/api/products' : 'https://rendah-mag.herokuapp.com/api/products';

export const fetchCollections = (range: Array) => (dispatch) => {
  dispatch({ type: COLLECTIONS_REQUESTING });

  const params = {
    range: `${range[0] - 1}..${range[1] - 1}`,
  };

  const query = `*[_type == "collection"] | order(publishedAt desc) [${params.range}] {
      title,
      description,
      "slug": slug.current,
    }`;

  return sanity.fetch(query).then((res) => {
    if (res) {
      dispatch({ type: COLLECTIONS_SUCCESS, data: res });
    } else {
      dispatch({ type: COLLECTIONS_FAILURE, err: 'error' });
    }
  });
};

/* istanbul ignore next */
export const fetchCollectionsIfNeeded = (limit: number) => dispatch =>
  dispatch(fetchCollections(limit));
