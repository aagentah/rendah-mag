/* @flow */
/* eslint-disable import/no-named-as-default, react/no-array-index-key */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Export this for unit testing more easily
export class NumberedList extends PureComponent {
  render() {
    return (
      <div>
        <ul>
          {this.props.list.map((item, i) => (
            <li className="pv1  normal-font  grey" key={i}><p>{item}</p></li>
          ))}
        </ul>
      </div>
    );
  }
}

NumberedList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string),
};

NumberedList.defaultProps = {
  list: [
    '',
  ],
};

export default NumberedList;
