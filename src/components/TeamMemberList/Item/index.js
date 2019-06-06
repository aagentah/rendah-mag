/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import AnimatedImage from '../../Elements/AnimatedImage';

export class Item extends PureComponent {
  render() {
    const { teamMember } = this.props;
    const { alias, role, order } = teamMember;

    let colClass;
    if (order === 1) colClass = 'col-24';
    if (order === 2) colClass = 'col-24  col-8-sm';
    if (order === 3) colClass = 'col-24  col-8-sm  col-6-md';

    return (
      <div className={`${colClass}  ph3  pb3  rel`}>
        <figure className={`rel  pb3  link  w-100 ${(order === 1 ? 'teamMember__firstRow' : '')}`}>
          <Link title={teamMember.slug} to={`/team/${teamMember.slug}`} className="link  db  h4  w4  shadow2  center  br4">
            <AnimatedImage
              lazy
              src={teamMember.img}
              alt={teamMember.name}
              styles="fade-in-zoom-in  h4  w4  center  br4"
            />
          </Link>
        </figure>
        <Link title={teamMember.slug} to={`/team/${teamMember.slug}`} className="t-title  black  f6  link  db  pt1  pb3  tac  cp">
          <p className="db">{teamMember.name}</p>
          <p className="db  t8  grey  pt1">{(alias) ? `(${alias})` : ''}</p>
          <p className="db  t8  grey  pt1">{(role) ? `${role}` : ''}</p>
        </Link>
      </div>
    );
  }
}

Item.propTypes = {
  teamMember: PropTypes.shape({
    order: PropTypes.number,
  }),
};

Item.defaultProps = {
  teamMember: {
    order: 3,
  },
};

export default Item;
