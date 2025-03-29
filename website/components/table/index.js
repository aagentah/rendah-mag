import React from 'react';

export default function Table({ rows, className = '' }) {
  return (
    <div className={`text-xs md:text-sm grid gap-y-2 ${className}`}>
      {rows.map((row, index) => {
        // If row is already a React element, render it directly
        if (React.isValidElement(row)) {
          return <React.Fragment key={index}>{row}</React.Fragment>;
        }

        // Otherwise, render based on left/right structure
        return (
          <p
            key={index}
            className={`flex justify-between border-b border-neutral-700 pb-2 ${
              row.className || ''
            }`}
          >
            <span className="text-neutral-400">{row.left}</span>
            <span
              className={`text-neutral-300 text-right flex ${
                row.rightClassName || ''
              }`}
            >
              {row.right}
            </span>
          </p>
        );
      })}
    </div>
  );
}
