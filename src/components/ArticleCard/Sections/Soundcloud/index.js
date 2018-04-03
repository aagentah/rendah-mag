/* @flow */
/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Player from 'react-soundcloud-player';

// Export this for unit testing more easily
export class Soundcloud extends PureComponent {
  render() {
    return (
      <div>
        <Player audio_id={this.props.id} title={this.props.text} />
      </div>
    );
  }
}

Soundcloud.propTypes = {
  text: PropTypes.string,
  id: PropTypes.string,
};

Soundcloud.defaultProps = {
  text: '',
  id: '',
};

export default Soundcloud;
