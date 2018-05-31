/* @flow */
/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';


export class Link extends PureComponent {
  linkType = () => {
    if (this.props.linkType) {
      switch (this.props.linkType) {
        case 'Soundcloud':
          return <span className="pv1  normal-font  grey">{this.props.linkType}</span>;
        default:
          return null;
      }
    }
    return null;
  };

  render() {
    return (
      <div>
        <a className="link  rendah-red  normal-font" href={this.props.url} target="_blank">
          {this.props.text}
          {this.linkType()}
        </a>
      </div>
    );
  }
}

Link.propTypes = {
  linkType: PropTypes.string,
  text: PropTypes.string,
  url: PropTypes.string,
};

Link.defaultProps = {
  linkType: '',
  text: '',
  url: '',
};

export default Link;
