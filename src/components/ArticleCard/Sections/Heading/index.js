/* @flow */
/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';


export class Heading extends PureComponent {
  render() {
    return (
      <div>
        <h2 className="title-font  dark-grey">{this.props.text}</h2>
      </div>
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
