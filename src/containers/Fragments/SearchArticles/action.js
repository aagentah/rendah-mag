import sanity from '../../../utils/sanity';

export const SEARCHARTICLES_INVALID = 'SEARCHARTICLES_INVALID';
export const SEARCHARTICLES_REQUESTING = 'SEARCHARTICLES_REQUESTING';
export const SEARCHARTICLES_FAILURE = 'SEARCHARTICLES_FAILURE';
export const SEARCHARTICLES_SUCCESS = 'SEARCHARTICLES_SUCCESS';

// export const API_URL = (__DEV__) ?
//   '/api/search' : 'https://rendah-mag.herokuapp.com/api/search';


export const fetchSearchArticles = (id: string) => (dispatch) => {
  dispatch({ type: SEARCHARTICLES_REQUESTING });

  const params = {
    limit: '0..23',
    id,
  };

  const query = `*[_type == "post" && title match $id || _type == "post" && description match $id] | order(publishedAt desc) [${params.limit}] {
    title,
    description,
    "slug": slug.current,
    "img": image.asset->url,
    "author": author->name,
    "created": publishedAt,
  }`;

  return sanity.fetch(query, params).then((res) => {
    if (res) {
      dispatch({ type: SEARCHARTICLES_SUCCESS, data: res });
    } else {
      dispatch({ type: SEARCHARTICLES_FAILURE, err: 'error' });
    }
  });
};

/* istanbul ignore next */
export const fetchSearchArticlesIfNeeded = (id: string) => (dispatch) => {
  dispatch(fetchSearchArticles(id));
};
