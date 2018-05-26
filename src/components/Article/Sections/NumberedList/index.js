/* @flow */
/* eslint-disable import/no-named-as-default, react/no-array-index-key */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';


export class NumberedList extends PureComponent {
  text = () => {
    if (this.props.text) {
      return <p className="pv1  normal-font  grey">{this.props.text}</p>;
    }
    return null;
  };

  render() {
    return (
      <div>
        {this.text()}
        <ol className="mb0">
          {this.props.list.map((item, i) => (
            <li className="pv1  normal-font  grey" key={i}><p>{item}</p></li>
          ))}
        </ol>
      </div>
    );
  }
}

NumberedList.propTypes = {
  text: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.string),
};

NumberedList.defaultProps = {
  text: '',
  list: [
    '',
  ],
};

export default NumberedList;
