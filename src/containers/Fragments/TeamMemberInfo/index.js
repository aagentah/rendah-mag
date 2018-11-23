/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { frontloadConnect } from 'react-frontload';
import compose from 'lodash/flowRight';

import * as action from './action';
import Loading from '../../../components/Loading';
import TeamMember from '../../../components/TeamMember';

export class TeamMemberInfo extends PureComponent {
  renderTeamMember = () => {
    const { teamMemberInfo, match: { params } } = this.props;
    const teamMemberInfoById = teamMemberInfo[params.id];

    if (
      !teamMemberInfoById ||
      teamMemberInfoById.readyStatus === action.TEAMMEMBER_REQUESTING ||
      teamMemberInfoById.readyStatus === action.TEAMMEMBER_FAILURE
    ) {
      return <Loading type="TeamMemberInfo" />;
    }

    return <TeamMember {...this.props} info={teamMemberInfoById.info} />;
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
