/* @flow */
/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';


export class Image extends PureComponent {
  render() {
    return (
      <div>
        <img className="w-100  db  center" alt={this.props.img} src={`https://res.cloudinary.com/dzz8ji5lj/image/upload/q_auto:good/${this.props.img}`} />
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
