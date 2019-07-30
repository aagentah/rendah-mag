/* @flow */
/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';


export class Answer extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <p className="t-body  lh-copy  f5  dark-grey  taj">&ldquo;{this.props.text}&ldquo;</p>
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
