/* @flow */
/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Iframe from 'react-iframe';
import { isChrome, isAndroid } from 'react-device-detect';

export class Soundcloud extends PureComponent {
  render() {
    if (isAndroid && isChrome) {
      return <p className="t8  normal-font  grey"><a className="t8  link  rendah-red" rel="noopener noreferrer" target="_blank" href="https://docs.google.com/a/rendahmag.com/forms/d/e/1FAIpQLSfNxc82RJuzC0DnISat7n4H-G7IsPQIdaMpe202iiHZEoso9w/closedform">Soundcloud&#39;s Application API</a> currently does not work with Android (Chrome) To preview, please try another browser.</p>;
    }
    return (
      <React.Fragment>
        <Iframe
          url={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${this.props.url}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`}
          width="100%"
          height="166"
          id="myId"
          className="w-100"
          display="initial"
          position="relative"
        />
      </React.Fragment>
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
