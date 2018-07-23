/* @flow */
/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';


export class Image extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <img className="w-80  db  center" alt={this.props.img} src={`https://res.cloudinary.com/dzz8ji5lj/image/upload/q_auto:good/${this.props.img}`} />
      </React.Fragment>
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
