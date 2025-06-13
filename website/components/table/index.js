import React from 'react';

export default function Table({ rows, className = '' }) {
  return (
    <div className={`text-xs md:text-sm grid gap-y-2 ${className}`}>
      {rows.map((row, index) => {
        if (React.isValidElement(row)) {
          return <React.Fragment key={index}>{row}</React.Fragment>;
        }

        return (
          <div
            key={index}
            className={`flex justify-between pb-2 ${
              index !== rows.length - 1 ? 'border-b border-neutral-700' : ''
            } ${row.className || ''}`}
          >
            <div className="text-neutral-500 pr-3 md:pr-4">{row.left}</div>
            <div
              className={`text-neutral-400 text-right flex ${
                row.rightClassName || ''
              }`}
            >
              {row.right}
            </div>
          </div>
        );
      })}
    </div>
  );
}
