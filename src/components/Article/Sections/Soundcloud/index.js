/* @flow */
/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Player from 'react-soundcloud-player';


export class Soundcloud extends PureComponent {
  render() {
    return (
      <div>
        <Player audio_id={this.props.url} />
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
