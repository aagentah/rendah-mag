/* @flow */
/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';


export class Image extends PureComponent {
  caption = () => {
    if (this.props.caption) {
      return <figcaption className="t8  fs-italic  tac  pt2  grey">{this.props.caption}</figcaption>;
    }
    return null;
  };

  render() {
    return (
      <figure>
        <img className="w-80  db  center" alt={this.props.img} src={`https://res.cloudinary.com/dzz8ji5lj/image/upload/q_auto:good/${this.props.img}`} />
        {this.caption()}
      </figure>
    );
  }
}

Image.propTypes = {
  img: PropTypes.string,
  caption: PropTypes.string,
};

Image.defaultProps = {
  img: '',
  caption: '',
};

export default Image;
