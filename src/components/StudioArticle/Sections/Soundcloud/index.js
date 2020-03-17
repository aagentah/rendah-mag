/* @flow */
/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Iframe from 'react-iframe';

export class Soundcloud extends PureComponent {
  render() {
    return (
      <div className="w-90  db  center">
        <Iframe
          url={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/${this.props.url}&color=%23777777&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=false&visual=false`}
          width="100%"
          height="166"
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
