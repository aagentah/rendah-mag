
export const AUTHORARTICLES_INVALID = 'AUTHORARTICLES_INVALID';
export const AUTHORARTICLES_REQUESTING = 'AUTHORARTICLES_REQUESTING';
export const AUTHORARTICLES_FAILURE = 'AUTHORARTICLES_FAILURE';
export const AUTHORARTICLES_SUCCESS = 'AUTHORARTICLES_SUCCESS';

export const API_URL = '/api/authorArticles';


export const fetchAuthorArticles = (query: string, axios: any, URL: string = API_URL) =>
  (dispatch) => {
    dispatch({ type: AUTHORARTICLES_REQUESTING });

    return axios.get(URL, { params: { authorQuery: query } })
      .then(res => dispatch({ type: AUTHORARTICLES_SUCCESS, data: res.data }))
      .catch(err => dispatch({ type: AUTHORARTICLES_FAILURE, err: err.message }));
  };

/* istanbul ignore next */
export const fetchAuthorArticlesIfNeeded = (query: string) =>
  (dispatch, getState, axios: any) => { dispatch(fetchAuthorArticles(query, axios)); };
