import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { FaTimes } from 'react-icons/fa';

export default function Modal(props) {
  const {
    /* Options */
    size,
    active,
    closeIcon,
    /* Children */
    children,
  } = props;

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const targetElement =
    (typeof window !== 'undefined' && document.getElementById('portal-root')) ||
    (typeof window !== 'undefined' && document.body);

  return mounted && active
    ? createPortal(
        <section
          className={`modal relative modal--${size} ${active && 'active'}`}
        >
          <div className="modal__dialog">
            {closeIcon && (
              <div
                className="absolute top right white mt2 mr2 cp z9 pa2"
                onClick={() => closeIcon(false)}
              >
                <FaTimes />
              </div>
            )}
            <div className="z1 relative w-100">{children}</div>
          </div>
        </section>,
        targetElement // Use custom portal target if provided
      )
    : null;
}
