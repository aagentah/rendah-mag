/* @flow */
/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Export this for unit testing more easily
export class Link extends PureComponent {
  render() {
    return (
      <div>
        <p className="pb1  fornt-normal-a  dark-grey">{this.props.text}</p>
        <a className="normal-font" href={this.props.url} target="_blank">{this.props.url}</a>
      </div>
    );
  }
}

Link.propTypes = {
  text: PropTypes.string,
  url: PropTypes.string,
};

Link.defaultProps = {
  text: '',
  url: '',
};

export default Link;
