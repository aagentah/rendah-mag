/* @flow */
/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';


export class Link extends PureComponent {
  linkType = () => {
    if (this.props.linkType) {
      switch (this.props.linkType) {
        case 'Soundcloud':
          return <img className="mr2  di" width="25" src="https://res.cloudinary.com/dzz8ji5lj/image/upload/c_scale,w_25/v1527784080/brand/social/iconmonstr-soundcloud-5.png" alt={this.props.linkType} role="presentation" />;
        case 'Twitter':
          return <img className="mr2  di" width="25" src="https://res.cloudinary.com/dzz8ji5lj/image/upload/c_scale,w_25/v1527784080/brand/social/iconmonstr-twitter-5.png" alt={this.props.linkType} role="presentation" />;
        case 'Youtube':
          return <img className="mr2  di" width="25" src="https://res.cloudinary.com/dzz8ji5lj/image/upload/c_scale,w_25/v1527784080/brand/social/iconmonstr-youtube-5.png" alt={this.props.linkType} role="presentation" />;
        case 'Instagram':
          return <img className="mr2  di" width="25" src="https://res.cloudinary.com/dzz8ji5lj/image/upload/c_scale,w_25/v1527784080/brand/social/iconmonstr-instagram-5.png" alt={this.props.linkType} role="presentation" />;
        case 'Facebook':
          return <img className="mr2  di" width="25" src="https://res.cloudinary.com/dzz8ji5lj/image/upload/c_scale,w_25/v1527784080/brand/social/iconmonstr-facebook-5.png" alt={this.props.linkType} role="presentation" />;
        case 'Website':
          return <img className="mr2  di" width="25" src="https://res.cloudinary.com/dzz8ji5lj/image/upload/c_scale,w_25/v1527844022/brand/social/iconmonstr-globe-5.png" alt={this.props.linkType} role="presentation" />;
        default:
          return null;
      }
    }
    return null;
  };

  render() {
    return (
      <div>
        <a className="link  black  normal-font" href={this.props.url} target="_blank">
          {this.linkType()}
          <span className="Article__link--span  pb2">{this.props.text}</span>
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
