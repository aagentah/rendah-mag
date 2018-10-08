import sanity from '../../../utils/sanity';

export const LATESTARTICLES_INVALID = 'LATESTARTICLES_INVALID';
export const LATESTARTICLES_REQUESTING = 'LATESTARTICLES_REQUESTING';
export const LATESTARTICLES_FAILURE = 'LATESTARTICLES_FAILURE';
export const LATESTARTICLES_SUCCESS = 'LATESTARTICLES_SUCCESS';

// export const API_URL = (__DEV__) ?
//   '/api/articles' : 'https://rendah-mag.herokuapp.com/api/articles';

export const fetchLatestArticles = (limit: number) =>
  (dispatch) => {
    dispatch({ type: LATESTARTICLES_REQUESTING });

    const params = {
      limit: `2..${((limit + 2) - 1)}`,
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
        dispatch({ type: LATESTARTICLES_SUCCESS, data: res });
      } else {
        dispatch({ type: LATESTARTICLES_FAILURE, err: 'error' });
      }
    });
  };


/* istanbul ignore next */
export const fetchLatestArticlesIfNeeded = (limit: number) => dispatch =>
  dispatch(fetchLatestArticles(limit));
