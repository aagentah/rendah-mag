import sanity from '../../../utils/sanity';

export const CATEGORYARTICLES_INVALID = 'CATEGORYARTICLES_INVALID';
export const CATEGORYARTICLES_REQUESTING = 'CATEGORYARTICLES_REQUESTING';
export const CATEGORYARTICLES_FAILURE = 'CATEGORYARTICLES_FAILURE';
export const CATEGORYARTICLES_SUCCESS = 'CATEGORYARTICLES_SUCCESS';

// export const API_URL = (__DEV__) ?
//   '/api/category' : 'https://rendah-mag.herokuapp.com/api/category';

export const fetchCategoryArticles = (id: string) =>
  (dispatch) => {
    dispatch({ type: CATEGORYARTICLES_REQUESTING });

    const params = {
      limit: '0..23',
      id,
    };

    const query = `*[_type == "category" && slug.current == $id] [0] {
      "articles": *[_type == "post" && references(^._id)] [${params.limit}] {
        title,
        description,
        "slug": slug.current,
        "img": image.asset->url,
        "author": author->name,
        "created": publishedAt,
        }
      }`;

    return sanity.fetch(query, params).then((res) => {
      if (res) {
        dispatch({ type: CATEGORYARTICLES_SUCCESS, data: res.articles });
      } else {
        dispatch({ type: CATEGORYARTICLES_FAILURE, err: 'error' });
      }
    });
  };

/* istanbul ignore next */
export const fetchCategoryArticlesIfNeeded = (id: string) =>
  (dispatch, getState, axios: any) => { dispatch(fetchCategoryArticles(id, axios)); };
