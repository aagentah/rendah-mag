/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import filter from 'lodash/filter';

import Item from './Item';

export class TeamMemberList extends PureComponent {
  render() {
    const { list, padding } = this.props;

    return (
      <div className={`container-medium  center  rel  ${padding}`}>
        <div className="flex  flex-wrap  pb0  pb4-sm  teamList__topRow">
          {filter(list, { order: 1 }).map(teamMember => (
            <Item key={teamMember.name} teamMember={teamMember} />
          ))}
        </div>
        <div className="flex  flex-wrap  pb0  pb4-sm">
          {filter(list, { order: 2 }).map(teamMember => (
            <Item key={teamMember.name} teamMember={teamMember} />
          ))}
        </div>
        <div className="flex  flex-wrap">
          {filter(list, { order: 3 }).map(teamMember => (
            <Item key={teamMember.name} teamMember={teamMember} />
          ))}
        </div>
      </div>
    );
  }
}

TeamMemberList.propTypes = {
  list: PropTypes.shape({
    order: PropTypes.number,
  }),
  padding: PropTypes.string,
};

TeamMemberList.defaultProps = {
  list: {
    order: 3,
  },
  padding: '',
};

export default TeamMemberList;
