import sanity from '../../../utils/sanity';

export const ARTICLE_REQUESTING = 'ARTICLE_REQUESTING';
export const ARTICLE_FAILURE = 'ARTICLE_FAILURE';
export const ARTICLE_SUCCESS = 'ARTICLE_SUCCESS';

// export const API_URL = (__DEV__) ?
//   '/api/article' : 'https://rendah-mag.herokuapp.com/api/article';

export const fetchArticle = (articleId: string) =>
  (dispatch) => {
    dispatch({ type: ARTICLE_REQUESTING, articleId });

    const params = {
      limit: '0',
      articleId,
    };

    const query =
    `*[_type == "post" && slug.current == $articleId] [${params.limit}] {
      title,
      description,
      "slug": slug.current,
      "img": image.asset->url,
      "author": author->name,
      "authorSlug": author->slug.current,
      "created": publishedAt,
      ...,
    }`;

    return sanity.fetch(query, params).then((res) => {
      if (res) {
        dispatch({ type: ARTICLE_SUCCESS, articleId, data: res });
      } else {
        dispatch({ type: ARTICLE_FAILURE, articleId, err: 'error' });
      }
    });
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
