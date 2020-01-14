/* @flow */
/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';


export class Heading extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <h2 className="t-title  f4  white">{this.props.text}</h2>
      </React.Fragment>
    );
  }
}

Heading.propTypes = {
  text: PropTypes.string,
};

Heading.defaultProps = {
  text: '',
};

export default Heading;
