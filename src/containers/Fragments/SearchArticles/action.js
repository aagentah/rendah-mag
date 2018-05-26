
export const SEARCHARTICLES_INVALID = 'SEARCHARTICLES_INVALID';
export const SEARCHARTICLES_REQUESTING = 'SEARCHARTICLES_REQUESTING';
export const SEARCHARTICLES_FAILURE = 'SEARCHARTICLES_FAILURE';
export const SEARCHARTICLES_SUCCESS = 'SEARCHARTICLES_SUCCESS';

export const API_URL = (__DEV__) ?
  '/api/search' : 'https://rendah-mag.herokuapp.com/api/search';


export const fetchSearchArticles = (query: string, axios: any, URL: string = API_URL) =>
  (dispatch) => {
    dispatch({ type: SEARCHARTICLES_REQUESTING });

    return axios.get(URL, { params: { searchQuery: query } })
      .then(res => dispatch({ type: SEARCHARTICLES_SUCCESS, data: res.data }))
      .catch(err => dispatch({ type: SEARCHARTICLES_FAILURE, err: err.message }));
  };

/* istanbul ignore next */
export const fetchSearchArticlesIfNeeded = (query: string) =>
  (dispatch, getState, axios: any) => { dispatch(fetchSearchArticles(query, axios)); };
