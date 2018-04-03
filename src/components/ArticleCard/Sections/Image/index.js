/* @flow */
/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Export this for unit testing more easily
export class Image extends PureComponent {
  render() {
    return (
      <div>
        <img className="w-100  db  center" alt={this.props.img} src={`http://res.cloudinary.com/dzz8ji5lj/image/upload/${this.props.img}`} />
      </div>
    );
  }
}

Image.propTypes = {
  img: PropTypes.string,
};

Image.defaultProps = {
  img: '',
};

export default Image;
