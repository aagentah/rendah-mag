import sanity from '../../../../utils/sanity';

export const TEAM_INVALID = 'TEAM_INVALID';
export const TEAM_REQUESTING = 'TEAM_REQUESTING';
export const TEAM_FAILURE = 'TEAM_FAILURE';
export const TEAM_SUCCESS = 'TEAM_SUCCESS';

// export const API_URL = (__DEV__) ?
//   '/api/team' : 'https://rendah-mag.herokuapp.com/api/team';

export const fetchTeam = () =>
  (dispatch) => {
    dispatch({ type: TEAM_REQUESTING });

    const params = {
      limit: '0..23',
    };

    const query =
    `*[_type == "author" && active] | order(publishedAt desc) [${params.limit}] {
      name,
      alias,
      description,
      "slug": slug.current,
      "img": image.asset->url,
      role,
      order,
      active,
    }`;

    return sanity.fetch(query).then((res) => {
      if (res) {
        dispatch({ type: TEAM_SUCCESS, data: res });
      } else {
        dispatch({ type: TEAM_FAILURE, err: 'error' });
      }
    });
  };

// Preventing dobule fetching data
/* istanbul ignore next */
const shouldFetchTeam = (state): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true; // Next line = Preventing double fetching data
  if (state.team.readyStatus === TEAM_SUCCESS) return false;
  return true;
};

/* istanbul ignore next */
export const fetchTeamIfNeeded = () => (dispatch, getState) => {
  /* istanbul ignore next */
  if (shouldFetchTeam(getState())) {
    /* istanbul ignore next */
    return dispatch(fetchTeam());
  }

  /* istanbul ignore next */
  return Promise.resolve();
};
