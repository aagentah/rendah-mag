/* @flow */
/* eslint-disable import/no-named-as-default, react/no-array-index-key */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Export this for unit testing more easily
export class BulletList extends PureComponent {
  render() {
    return (
      <div>
        <ol>
          {this.props.list.map((item, i) => (
            <li className="pv1  normal-font  grey" key={i}><p>{item}</p></li>
          ))}
        </ol>
      </div>
    );
  }
}

BulletList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string),
};

BulletList.defaultProps = {
  list: [
    '',
  ],
};

export default BulletList;
