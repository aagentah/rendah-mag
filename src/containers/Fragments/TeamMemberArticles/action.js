import sanity from '../../../utils/sanity';

export const TEAMMEMBERARTICLES_INVALID = 'TEAMMEMBERARTICLES_INVALID';
export const TEAMMEMBERARTICLES_REQUESTING = 'TEAMMEMBERARTICLES_REQUESTING';
export const TEAMMEMBERARTICLES_FAILURE = 'TEAMMEMBERARTICLES_FAILURE';
export const TEAMMEMBERARTICLES_SUCCESS = 'TEAMMEMBERARTICLES_SUCCESS';

// export const API_URL = (__DEV__) ?
//   '/api/team-memberArticles' : 'https://rendah-mag.herokuapp.com/api/team-memberArticles';

export const fetchTeamMemberArticles = (id: string) =>
  (dispatch) => {
    dispatch({ type: TEAMMEMBERARTICLES_REQUESTING });

    const params = {
      limit: '0..23',
      id,
    };

    const query = `*[_type == "author" && slug.current == $id] [0] {
    "articles": *[_type == "post" && references(^._id)] | order(publishedAt desc) [${params.limit}] {
      title,
      description,
      "slug": slug.current,
      "img": image.asset->url,
      "teamMember": author->name,
      "created": publishedAt,
    }
  }`;

    return sanity.fetch(query, params).then((res) => {
      if (res) {
        dispatch({ type: TEAMMEMBERARTICLES_SUCCESS, data: res.articles });
      } else {
        dispatch({ type: TEAMMEMBERARTICLES_FAILURE, err: 'error' });
      }
    });
  };

/* istanbul ignore next */
export const fetchTeamMemberArticlesIfNeeded = (id: string) => dispatch =>
  dispatch(fetchTeamMemberArticles(id));
