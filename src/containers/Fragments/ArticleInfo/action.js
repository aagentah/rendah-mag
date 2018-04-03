
export const ARTICLE_REQUESTING = 'ARTICLE_REQUESTING';
export const ARTICLE_FAILURE = 'ARTICLE_FAILURE';
export const ARTICLE_SUCCESS = 'ARTICLE_SUCCESS';

// export const API_URL = 'https://jsonplaceholder.typicode.com/articles';
export const API_URL = '/api/article';

// Export this for unit testing more easily
export const fetchArticle = (articleId: string, axios: any, URL: string = API_URL) =>
  (dispatch) => {
    dispatch({ type: ARTICLE_REQUESTING, articleId });

    return axios.get(URL, { params: { title: articleId } })
      .then(res => dispatch({ type: ARTICLE_SUCCESS, articleId, data: res.data }))
      .catch(err => dispatch({ type: ARTICLE_FAILURE, articleId, err: err.message }));
  };

// Using for preventing dobule fetching data
/* istanbul ignore next */
const shouldFetchArticle = (state, articleId: string): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true;
  const articleInfo = state.articleInfo[articleId];
  // Preventing dobule fetching data in production
  if (articleInfo && articleInfo.readyStatus === ARTICLE_SUCCESS) return false;
  return true;
};

/* istanbul ignore next */
export const fetchArticleIfNeeded = (articleId: string) =>
  (dispatch, getState, axios: any) => {
    /* istanbul ignore next */
    if (shouldFetchArticle(getState(), articleId)) {
      /* istanbul ignore next */
      return dispatch(fetchArticle(articleId, axios));
    }

    /* istanbul ignore next */
    return null;
  };
