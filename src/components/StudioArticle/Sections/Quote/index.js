/* @flow */
/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';


export class Quote extends PureComponent {
  render() {
    const { quote, source } = this.props;

    return (
      <React.Fragment>
        <p className="bw2  bl  bc-light-grey  pa3">
          <q className="t-body  lh-copy  f5  white  di  taj">{quote}</q>
          <span className="t-body  lh-copy  f6  white  fs-normal  di  tac  pt2  pl2">- {source}</span>
        </p>
      </React.Fragment>
    );
  }
}

Quote.propTypes = {
  quote: PropTypes.string,
  source: PropTypes.string,
};

Quote.defaultProps = {
  quote: '',
  source: '',
};

export default Quote;
