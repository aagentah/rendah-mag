/* @flow */
/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';


export class Image extends PureComponent {
  render() {
    const imageRef = this.props.section.asset._ref;
    const imageUrl =
      imageRef.replace('image-', 'https://cdn.sanity.io/images/1o42t029/production/')
        .replace('-jpg', '.jpg')
        .replace('-png', '.png');

    return (
      <figure>
        <img className="studio-article__image  db  center  shadow2" alt={imageUrl} src={imageUrl} />
      </figure>
    );
  }
}

Image.propTypes = {
  section: PropTypes.string,
};

Image.defaultProps = {
  section: '',
};

export default Image;
