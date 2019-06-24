/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export class SideList extends PureComponent {
  render() {
    const { list, padding } = this.props;
    console.log(list);

    return (
      <ul className={`${padding}`}>
        {list.map(item => (
          <li key={item.title} className="col-24  col-12-sm  col-24-lg  pv2">
            <Link title={item.slug} to={`/store/${item.slug}`} className="t-body  db  link  pt2">
              <p className="t-title  black  f6  cp  over-hidden  link  list-card__title">{item.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    );
  }
}

SideList.propTypes = {
  list: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  padding: PropTypes.string,
};

SideList.defaultProps = {
  list: [],
  padding: '',
};

export default SideList;
