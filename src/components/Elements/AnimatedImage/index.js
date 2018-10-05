/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';

class AnimatedImage extends Component {
  render() {
    const { lazy, src, alt, styles } = this.props;

    if (lazy) {
      return (
        <React.Fragment>
          <LazyLoad height={0} offset={300} once>
            <div className="over-hidden">
              <img
                className={`fadeIn-zoomIn  objf-cover  objp-center  ${styles}`}
                src={src}
                alt={alt}
              />
            </div>
          </LazyLoad>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <div className="over-hidden">
          <img
            className={`fadeIn-zoomIn  objf-cover  objp-center  ${styles}`}
            src={src}
            alt={alt}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default AnimatedImage;

AnimatedImage.propTypes = {
  lazy: PropTypes.bool,
  src: PropTypes.string,
  alt: PropTypes.string,
  styles: PropTypes.string,
};

AnimatedImage.defaultProps = {
  lazy: false,
  src: '',
  alt: '',
  styles: '',
};
