/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { frontloadConnect } from 'react-frontload';
import compose from 'lodash/flowRight';

import * as action from './action';
import Loading from '../../../components/Loading';
import LatestTeamMemberList from '../../../components/TeamMemberList';


export class Team extends PureComponent {
  renderLatestTeamMemberList = () => {
    const { team } = this.props;

    if (
      !team.readyStatus ||
      team.readyStatus === action.TEAM_INVALID ||
      team.readyStatus === action.TEAM_REQUESTING ||
      team.readyStatus === action.TEAM_FAILURE
    ) {
      return <Loading type="Team" />;
    }

    return <LatestTeamMemberList {...this.props} list={team.list} />;
  };

  render() {
    return (
      <React.Fragment>
        {this.renderLatestTeamMemberList()}
      </React.Fragment>
    );
  }
}

const connector = connect(
  ({ team }) => ({ team }),
  dispatch => ({
    fetchTeamIfNeeded: () => dispatch(action.fetchTeamIfNeeded()),
  }),
);

Team.propTypes = {
  team: PropTypes.shape({
    readyStatus: PropTypes.string,
    err: PropTypes.any,
    list: PropTypes.arrayOf(PropTypes.object),
  }),
};

Team.defaultProps = {
  team: {
    readyStatus: '',
    err: '',
    list: [{}],
  },
};

const frontload = props =>
  Promise.all([
    props.fetchTeamIfNeeded(),
  ]);

export default compose(
  connector,
  frontloadConnect(frontload, { onUpdate: false }),
)(Team);
