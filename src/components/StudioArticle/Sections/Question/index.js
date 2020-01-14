/* @flow */
/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';


export class Question extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <p className="t-body  lh-copy  bold  f5  dark-grey  taj">{this.props.text}</p>
      </React.Fragment>
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
