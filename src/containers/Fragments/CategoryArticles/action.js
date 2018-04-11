
export const CATEGORYARTICLES_INVALID = 'CATEGORYARTICLES_INVALID';
export const CATEGORYARTICLES_REQUESTING = 'CATEGORYARTICLES_REQUESTING';
export const CATEGORYARTICLES_FAILURE = 'CATEGORYARTICLES_FAILURE';
export const CATEGORYARTICLES_SUCCESS = 'CATEGORYARTICLES_SUCCESS';

export const API_URL = '/api/category';


export const fetchCategoryArticles = (query: string, axios: any, URL: string = API_URL) =>
  (dispatch) => {
    dispatch({ type: CATEGORYARTICLES_REQUESTING });

    return axios.get(URL, { params: { categoryQuery: query } })
      .then(res => dispatch({ type: CATEGORYARTICLES_SUCCESS, data: res.data }))
      .catch(err => dispatch({ type: CATEGORYARTICLES_FAILURE, err: err.message }));
  };

/* istanbul ignore next */
export const fetchCategoryArticlesIfNeeded = (query: string) =>
  (dispatch, getState, axios: any) => { dispatch(fetchCategoryArticles(query, axios)); }
