import React from 'react';

/**
 * Avatar
 */

export default function Avatar(props) {
  const {
    /* Options */
    /* Children */
    image,
    title,
    description
  } = props;

  return (
    <address className="avatar">
      <div className="avatar__image">{image}</div>
      <div className="avatar__dialog">
        {title && <div className="avatar__title">{title}</div>}
        {description && <p className="avatar__description">{description}</p>}
      </div>
    </address>
  );
}
