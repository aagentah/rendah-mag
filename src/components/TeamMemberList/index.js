/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Item from './Item';

export class TeamMemberList extends PureComponent {
  render() {
    const { list, padding } = this.props;

    return (
      <div className={`container-medium  center  ${padding}`}>
        <div className="flex  flex-wrap">
          {list.map(teamMember => (
            <Item key={teamMember.name} teamMember={teamMember} />
          ))}
        </div>
      </div>
    );
  }
}

TeamMemberList.propTypes = {
  list: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  padding: PropTypes.string,
};

TeamMemberList.defaultProps = {
  list: [],
  padding: '',
};

export default TeamMemberList;
