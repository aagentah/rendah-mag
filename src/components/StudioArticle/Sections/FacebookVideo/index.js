/* @flow */
/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import FacebookProvider, { EmbeddedVideo } from 'react-facebook';

export class Link extends PureComponent {
  render() {
    return (
      <div className="center  tac  db  w-90  center">
        <FacebookProvider appId="154881868603516">
          <EmbeddedVideo href={this.props.url} />
        </FacebookProvider>
      </div>
    );
  }
}

Link.propTypes = {
  url: PropTypes.string,
};

Link.defaultProps = {
  url: '',
};

export default Link;
