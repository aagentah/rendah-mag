import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { FaTimes } from 'react-icons/fa';

export default function Modal({ size, active, closeIcon, children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const targetElement =
    (typeof window !== 'undefined' && document.getElementById('portal-root')) ||
    (typeof window !== 'undefined' && document.body);

  if (!mounted || !active) return null;

  // Determine modal dialog size classes based on size prop.
  let sizeClasses = '';
  switch (size) {
    case 'small':
      sizeClasses = 'max-w-[400px] w-[90%]';
      break;
    case 'medium':
      sizeClasses = 'max-w-[600px] w-[90%]';
      break;
    case 'large':
      sizeClasses = 'max-w-[800px] w-[90%]';
      break;
    case 'x-large':
      sizeClasses = 'max-w-[1080px] w-[90%]';
      break;
    case 'gallery':
      sizeClasses =
        'max-w-[90vw] max-h-[90vh] w-auto h-auto flex items-center justify-center';
      break;
    default:
      sizeClasses = 'max-w-[600px] w-[90%]';
  }

  return createPortal(
    <section className="fixed inset-0 bg-black bg-opacity-65 transition-opacity duration-200 z-[1080] pointer-events-auto">
      <div
        className={`border-l-4 border-rendah-red absolute left-0 right-0 top-1/2 transform -translate-y-1/2 bg-neutral-800 mx-auto overflow-auto ${sizeClasses} shadow-md p-6 py-10 sm:p-8 md:p-10 md:p-12 max-h-[90vh] sm:max-h-[80vh] md:max-h-[70vh]`}
      >
        {closeIcon && (
          <div
            className="absolute top-[25px] right-[25px] cursor-pointer p-2 text-gray-500 z-50"
            onClick={() => closeIcon(false)}
          >
            <FaTimes />
          </div>
        )}
        <div className="relative w-full z-10">{children}</div>
      </div>
    </section>,
    targetElement
  );
}
