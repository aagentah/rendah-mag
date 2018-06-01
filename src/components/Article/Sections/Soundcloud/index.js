/* @flow */
/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Iframe from 'react-iframe';


export class Soundcloud extends PureComponent {
  render() {
    return (
      <div>
        <Iframe
          url={this.props.url}
          width="100%"
          height="166"
          id="myId"
          className="w-100"
          display="initial"
          position="relative"
        />
      </div>
    );
  }
}

Soundcloud.propTypes = {
  url: PropTypes.string,
};

Soundcloud.defaultProps = {
  url: '',
};

export default Soundcloud;
