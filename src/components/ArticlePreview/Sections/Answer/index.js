/* @flow */
/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';


export class Answer extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <p className="t-body  f5  dark-grey">&ldquo;{this.props.text}&ldquo;</p>
      </React.Fragment>
    );
  }
}

Answer.propTypes = {
  text: PropTypes.string,
};

Answer.defaultProps = {
  text: '',
};

export default Answer;
