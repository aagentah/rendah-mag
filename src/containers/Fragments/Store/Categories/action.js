import sanity from '../../../../utils/sanity-store';

export const CATEGORIES_INVALID = 'CATEGORIES_INVALID';
export const CATEGORIES_REQUESTING = 'CATEGORIES_REQUESTING';
export const CATEGORIES_FAILURE = 'CATEGORIES_FAILURE';
export const CATEGORIES_SUCCESS = 'CATEGORIES_SUCCESS';

// export const API_URL = (__DEV__) ?
//   '/api/products' : 'https://rendah-mag.herokuapp.com/api/products';

export const fetchCategories = (range: Array) =>
  (dispatch) => {
    console.log('dispatch', dispatch);
    dispatch({ type: CATEGORIES_REQUESTING });

    const params = {
      range: `${range[0] - 1}..${range[1] - 1}`,
    };

    const query =
    `*[_type == "category"] | order(publishedAt desc) [${params.range}] {
      title,
      description,
      "slug": slug.current,
    }`;

    return sanity.fetch(query).then((res) => {
      if (res) {
        dispatch({ type: CATEGORIES_SUCCESS, data: res });
      } else {
        dispatch({ type: CATEGORIES_FAILURE, err: 'error' });
      }
    });
  };


/* istanbul ignore next */
export const fetchCategoriesIfNeeded = (limit: number) => dispatch =>
  dispatch(fetchCategories(limit));
