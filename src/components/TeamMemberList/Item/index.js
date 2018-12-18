/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import AnimatedImage from '../../Elements/AnimatedImage';

export class Item extends PureComponent {
  render() {
    const { teamMember } = this.props;
    const { alias } = teamMember;

    return (
      <div className="col-24  col-12-sm  col-6-md  ph3  pb3">
        <figure className="rel  pb3  link  w-100">
          <Link title={teamMember.slug} to={`/teamMember/${teamMember.slug}`} className="link  db  h4  w4  shadow2  center  br-100">
            <AnimatedImage
              lazy
              src={teamMember.img}
              alt={teamMember.name}
              styles="fade-in-zoom-in  h4  w4  center  br-100"
            />
          </Link>
        </figure>
        <Link title={teamMember.slug} to={`/team/${teamMember.slug}`} className="t-title  black  f6  link  db  pt1  pb3  tac  cp">
          <span className="db">{teamMember.name}</span>
          <span className="db  t8  grey  pt1">{(alias) ? `(${alias})` : ''}</span>
        </Link>
      </div>
    );
  }
}

Item.propTypes = {
  teamMember: PropTypes.shape(),
};

Item.defaultProps = {
  teamMember: {},
};

export default Item;
