/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { frontloadConnect } from 'react-frontload';
import compose from 'lodash/flowRight';

import * as action from './action';
import Loading from '../../../components/Loading';
import TeamMember from '../../../components/TeamMember';
import ArticleListGrid from '../../../components/ArticleList/Grid';

export class TeamMemberInfo extends PureComponent {
  renderTeamMember = () => {
    const { teamMemberInfo, match: { params } } = this.props;
    const teamMemberInfoById = teamMemberInfo[params.id];
    let hasArticles;

    if (
      !teamMemberInfoById ||
      teamMemberInfoById.readyStatus === action.TEAMMEMBER_REQUESTING ||
      teamMemberInfoById.readyStatus === action.TEAMMEMBER_FAILURE
    ) {
      return <Loading type="TeamMemberInfo" />;
    }

    if (teamMemberInfoById.info.articles.length > 0) {
      hasArticles = (
        <React.Fragment>
          <p className="t-title  bold  tac  f6  ttu  pt2  pb3">LATEST FROM {teamMemberInfoById.info.slug.split('-')[0]}</p>
          <ArticleListGrid padding="pt2" type="grid" list={teamMemberInfoById.info.articles} />
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <TeamMember {...this.props} info={teamMemberInfoById.info} />
        {hasArticles}
      </React.Fragment>
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.renderTeamMember()}
      </React.Fragment>
    );
  }
}

const connector = connect(
  ({ teamMemberInfo }) => ({ teamMemberInfo }),
  dispatch => ({
    fetchTeamMemberIfNeeded: (id: string) => dispatch(action.fetchTeamMemberIfNeeded(id)),
  }),
);

TeamMemberInfo.propTypes = {
  teamMemberInfo: PropTypes.shape({
    teamMemberId: PropTypes.string,
    readyStatus: PropTypes.string,
    err: PropTypes.any,
    info: PropTypes.object,
  }),
  match: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

TeamMemberInfo.defaultProps = {
  teamMemberInfo: {
    teamMemberId: '',
    readyStatus: '',
    err: '',
    info: {},
  },
  match: [],
};

const frontload = props =>
  Promise.all([
    props.fetchTeamMemberIfNeeded(props.match.params.id),
  ]);

export default compose(
  connector,
  frontloadConnect(frontload, { onUpdate: false }),
)(TeamMemberInfo);
