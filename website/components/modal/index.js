import React from 'react';
import { FaTimes } from 'react-icons/fa'; // Import the close icon

/**
 * A card displays site content in a manner similar to a playing card.
 */

export default function Modal(props) {
  const {
    /* Options */
    size,
    active,
    closeIcon,
    /* Children */
    children,
  } = props;

  return (
    <section
      className={`modal relative  modal--${size}  ${active && 'active'}`}
    >
      <div className="modal__dialog">
        {closeIcon && (
          <div
            className="absolute top right white mt3 mr3 cp z9 pa2"
            onClick={() => closeIcon(false)}
          >
            <FaTimes />
          </div>
        )}
        <div className="z1 relative">{children}</div>
      </div>
    </section>
  );
}
