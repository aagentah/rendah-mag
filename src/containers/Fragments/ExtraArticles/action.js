
export const EXTRAARTICLES_INVALID = 'EXTRAARTICLES_INVALID';
export const EXTRAARTICLES_REQUESTING = 'EXTRAARTICLES_REQUESTING';
export const EXTRAARTICLES_FAILURE = 'EXTRAARTICLES_FAILURE';
export const EXTRAARTICLES_SUCCESS = 'EXTRAARTICLES_SUCCESS';

export const API_URL = (__DEV__) ?
  '/api/extra' : 'https://rendah-mag.herokuapp.com/api/extra';


export const fetchExtraArticles = (limit: number, axios: any, URL: string = API_URL) =>
  (dispatch) => {
    dispatch({ type: EXTRAARTICLES_REQUESTING });

    return axios.get(URL, { params: { limit } })
      .then(res => dispatch({ type: EXTRAARTICLES_SUCCESS, limit, data: res.data }))
      .catch(err => dispatch({ type: EXTRAARTICLES_FAILURE, limit, err: err.message }));
  };

/* istanbul ignore next */
export const fetchExtraArticlesIfNeeded = (limit: number) =>
  (dispatch, getState, axios: any) => {
    dispatch(fetchExtraArticles(limit, axios));
  };
