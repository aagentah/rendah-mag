/* @flow */
/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Export this for unit testing more easily
export class Question extends PureComponent {
  render() {
    return (
      <div>
        <p className="normal-font  fw6  dark-grey">{this.props.text}</p>
      </div>
    );
  }
}

Question.propTypes = {
  text: PropTypes.string,
};

Question.defaultProps = {
  text: '',
};

export default Question;
