import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

export default function Input(props) {
  const { type, label, name, value, icon, required, disabled, readOnly } =
    props;

  const [inputValue, setInputValue] = useState('');
  const [hasValue, setHasValue] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (value) {
      setInputValue(value);
      setHasValue(true);
    }
  }, [value]);

  const handleInput = (e) => {
    setInputValue(e.target.value);
    setHasValue(!!e.target.value);
  };

  // Determine label positioning.
  // If an icon exists and the input is neither focused nor has a value,
  // shift the label right.
  const labelLeft = icon && !isFocused && !hasValue ? 'left-[25px]' : 'left-0';

  return (
    <div className="relative flex items-end h-[50px] w-full group text-neutral-400">
      {icon && (
        <span className="absolute bottom-[5px] left-0 text-neutral-300">
          {icon}
        </span>
      )}
      <input
        className={classNames(
          'w-full border-0 bg-transparent appearance-none',
          'px-6 border-b border-gray-500 h-[35px] text-base',
          'focus:outline-none disabled:cursor-not-allowed'
        )}
        type={type}
        name={name}
        value={inputValue}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        onChange={handleInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {label && (
        <span
          className={classNames(
            'transition-all ease-in-out duration-200 pointer-events-none absolute',
            labelLeft,
            {
              // When the input is focused or has a value, move the label upward
              'bottom-[35px] text-sm': isFocused || hasValue,
              // Otherwise, keep the label near the input bottom
              'bottom-[9px] text-xs': !isFocused && !hasValue,
            }
          )}
        >
          {label}
        </span>
      )}
      {/* Focus Border */}
      <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-neutral-500 transition-all duration-400 group-focus-within:w-full" />
    </div>
  );
}
