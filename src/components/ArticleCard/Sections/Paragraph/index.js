/* @flow */
/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';


export class Paragraph extends PureComponent {
  render() {
    return (
      <div>
        <p className="normal-font  grey">{this.props.text}</p>
      </div>
    );
  }
}

Paragraph.propTypes = {
  text: PropTypes.string,
};

Paragraph.defaultProps = {
  text: '',
};

export default Paragraph;
