import React from 'react';

/**
 * A card displays site content in a manner similar to a playing card.
 */

export default function Modal(props) {
  const {
    /* Options */
    size,
    active,
    /* Children */
    children
  } = props;

  return (
    <section className={`modal  modal--${size}  ${active && 'active'}`}>
      <div className="modal__dialog">{children}</div>
    </section>
  );
}
