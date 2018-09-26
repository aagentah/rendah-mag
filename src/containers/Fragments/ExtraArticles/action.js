import sanity from '../../../utils/sanity';

export const EXTRAARTICLES_INVALID = 'EXTRAARTICLES_INVALID';
export const EXTRAARTICLES_REQUESTING = 'EXTRAARTICLES_REQUESTING';
export const EXTRAARTICLES_FAILURE = 'EXTRAARTICLES_FAILURE';
export const EXTRAARTICLES_SUCCESS = 'EXTRAARTICLES_SUCCESS';

// export const API_URL = (__DEV__) ?
//   '/api/extra' : 'https://rendah-mag.herokuapp.com/api/extra';


export const fetchExtraArticles = (limit: number) =>
  (dispatch) => {
    dispatch({ type: EXTRAARTICLES_REQUESTING });

    const params = {
      limit: `0..${(limit - 1)}`,
    };

    // const query =
    // `*[_type == "post"] | order(publishedAt desc) [${params.limit}] {
    //   ...,
    //   author->,
    //   category->,
    //   "mainImage": mainImage.asset->url,
    // }`;

    const query =
    `*[_type == "post"] [${params.limit}] | order(_createdAt desc) {
      title,
      description,
      "slug": slug.current,
      "img": mainImage.asset->url,
      "author": author->name,
      "created": _createdAt,
    }`;

    sanity.fetch(query).then((res) => {
      // dispatch({ type: LATEST_ARTICLES, articlesLatest });
      // resolve(articlesLatest);
      console.log('radommmm fetch');
      console.log(res);

      if (res) {
        dispatch({ type: EXTRAARTICLES_SUCCESS, data: res });
      } else {
        dispatch({ type: EXTRAARTICLES_FAILURE, err: 'error' });
      }

      // return axios.get(URL, { params: { limit } })
      //   .then(res => dispatch({ type: EXTRAARTICLES_SUCCESS, data: res.data }))
      //   .catch(err => dispatch({ type: EXTRAARTICLES_FAILURE, err: err.message }));
    });
  };

/* istanbul ignore next */
export const fetchExtraArticlesIfNeeded = (limit: number) =>
  (dispatch, getState, axios: any) => {
    dispatch(fetchExtraArticles(limit, axios));
  };
