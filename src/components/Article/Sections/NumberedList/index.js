/* @flow */
/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';


export class NumberedList extends PureComponent {
  text = () => {
    if (this.props.text) {
      return <p className="pv1  t-body  f5  dark-grey">{this.props.text}</p>;
    }
    return null;
  };

  render() {
    return (
      <React.Fragment>
        {this.text()}
        <ol className="pl3">
          {this.props.list.map(item => (
            <li key={item} className="pv1  t-body  f5  dark-grey"><p>{item}</p></li>
          ))}
        </ol>
      </React.Fragment>
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
