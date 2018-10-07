import sanity from '../../../utils/sanity';

export const AUTHORARTICLES_INVALID = 'AUTHORARTICLES_INVALID';
export const AUTHORARTICLES_REQUESTING = 'AUTHORARTICLES_REQUESTING';
export const AUTHORARTICLES_FAILURE = 'AUTHORARTICLES_FAILURE';
export const AUTHORARTICLES_SUCCESS = 'AUTHORARTICLES_SUCCESS';

// export const API_URL = (__DEV__) ?
//   '/api/authorArticles' : 'https://rendah-mag.herokuapp.com/api/authorArticles';

export const fetchAuthorArticles = (id: string) =>
  (dispatch) => {
    dispatch({ type: AUTHORARTICLES_REQUESTING });

    const params = {
      limit: '0..23',
      id,
    };

    const query = `*[_type == "author" && slug.current == $id] [0] {
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
        dispatch({ type: AUTHORARTICLES_SUCCESS, data: res.articles });
      } else {
        dispatch({ type: AUTHORARTICLES_FAILURE, err: 'error' });
      }
    });
  };

/* istanbul ignore next */
export const fetchAuthorArticlesIfNeeded = (id: string) =>
  (dispatch, getState, axios: any) => { dispatch(fetchAuthorArticles(id, axios)); };
