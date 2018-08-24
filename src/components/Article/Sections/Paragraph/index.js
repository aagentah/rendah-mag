/* @flow */
/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';


export class Paragraph extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <p className="t-body  grey">{this.props.text}</p>
      </React.Fragment>
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
