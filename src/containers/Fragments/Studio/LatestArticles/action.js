import sanity from '../../../../utils/sanity-studio';

export const LATESTSTUDIOARTICLES_INVALID = 'LATESTSTUDIOARTICLES_INVALID';
export const LATESTSTUDIOARTICLES_REQUESTING = 'LATESTSTUDIOARTICLES_REQUESTING';
export const LATESTSTUDIOARTICLES_FAILURE = 'LATESTSTUDIOARTICLES_FAILURE';
export const LATESTSTUDIOARTICLES_SUCCESS = 'LATESTSTUDIOARTICLES_SUCCESS';

// export const API_URL = (__DEV__) ?
//   '/api/articles' : 'https://rendah-mag.herokuapp.com/api/articles';

export const fetchLatestStudioArticles = (range: Array) =>
  (dispatch) => {
    dispatch({ type: LATESTSTUDIOARTICLES_REQUESTING });

    const params = {
      range: `${range[0] - 1}..${range[1] - 1}`,
    };

    const query =
    `*[_type == "post"] | order(publishedAt desc) [${params.range}] {
      title,
      description,
      "slug": slug.current,
      "img": image.asset->url,
      "created": publishedAt,
    }`;

    return sanity.fetch(query).then((res) => {
      if (res) {
        dispatch({ type: LATESTSTUDIOARTICLES_SUCCESS, data: res });
      } else {
        dispatch({ type: LATESTSTUDIOARTICLES_FAILURE, err: 'error' });
      }
    });
  };


/* istanbul ignore next */
export const fetchLatestStudioArticlesIfNeeded = (range: Array) => dispatch =>
  dispatch(fetchLatestStudioArticles(range));
