import sanity from '../../../utils/sanity';

export const TEAMMEMBER_REQUESTING = 'TEAMMEMBER_REQUESTING';
export const TEAMMEMBER_FAILURE = 'TEAMMEMBER_FAILURE';
export const TEAMMEMBER_SUCCESS = 'TEAMMEMBER_SUCCESS';

// export const API_URL = (__DEV__) ?
//   '/api/team' : 'https://rendah-mag.herokuapp.com/api/team';

export const fetchTeamMember = (teamMemberId: string) =>
  (dispatch) => {
    dispatch({ type: TEAMMEMBER_REQUESTING, teamMemberId });

    const params = {
      limit: '0..23',
      teamMemberId,
    };

    const query = `*[_type == "author" && slug.current == $teamMemberId] [0] {
      name,
      alias,
      description,
      "img": image.asset->url,
      "slug": slug.current,
      socialHandles,
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
        console.log('res ---', res);
        dispatch({ type: TEAMMEMBER_SUCCESS, teamMemberId, data: res });
      } else {
        dispatch({ type: TEAMMEMBER_FAILURE, teamMemberId, err: 'error' });
      }
    });
  };

// Using for preventing dobule fetching data
/* istanbul ignore next */
const shouldFetchTeamMember = (state, teamMemberId: string): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true;
  const teamMemberInfo = state.teamMemberInfo[teamMemberId];
  // Preventing dobule fetching data in production
  if (teamMemberInfo && teamMemberInfo.readyStatus === TEAMMEMBER_SUCCESS) return false;
  return true;
};

/* istanbul ignore next */
export const fetchTeamMemberIfNeeded = (teamMemberId: string) => (dispatch, getState) => {
  /* istanbul ignore next */
  if (shouldFetchTeamMember(getState(), teamMemberId)) {
    /* istanbul ignore next */
    return dispatch(fetchTeamMember(teamMemberId));
  }

  /* istanbul ignore next */
  return Promise.resolve();
};
