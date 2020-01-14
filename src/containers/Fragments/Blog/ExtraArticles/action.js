import sanity from '../../../../utils/sanity';

export const EXTRAARTICLES_INVALID = 'EXTRAARTICLES_INVALID';
export const EXTRAARTICLES_REQUESTING = 'EXTRAARTICLES_REQUESTING';
export const EXTRAARTICLES_FAILURE = 'EXTRAARTICLES_FAILURE';
export const EXTRAARTICLES_SUCCESS = 'EXTRAARTICLES_SUCCESS';

// export const API_URL = (__DEV__) ?
//   '/api/extra' : 'https://rendah-mag.herokuapp.com/api/extra';

export const fetchExtraArticles = (range: Array) =>
  (dispatch) => {
    dispatch({ type: EXTRAARTICLES_REQUESTING });

    const params = {
      range: `${range[0] - 1}..${range[1] - 1}`,
    };
    const query =
    `*[_type == "post"] [${params.range}] | order(publishedAt desc) {
      title,
      description,
      "slug": slug.current,
      "img": image.asset->url,
      "teamMember": author->name,
      "created": publishedAt,
    }`;

    return sanity.fetch(query).then((res) => {
      if (res) {
        dispatch({ type: EXTRAARTICLES_SUCCESS, data: res });
      } else {
        dispatch({ type: EXTRAARTICLES_FAILURE, err: 'error' });
      }
    });
  };

/* istanbul ignore next */
export const fetchExtraArticlesIfNeeded = (range: Array) => dispatch =>
  dispatch(fetchExtraArticles(range));
