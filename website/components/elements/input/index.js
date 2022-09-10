import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

/**
 * A Input.
 */

export default function Input(props) {
  const [inputValue, setInputValue] = useState('');
  const [hasValue, setHasValue] = useState(false);

  const {
    /* Options */
    type,
    label,
    name,
    value,
    icon,
    required,
    disabled,
    readOnly
  } = props;

  useEffect(() => {
    if (value) {
      setHasValue(true);
      setInputValue(value);
    }
  }, [value]);

  const hasValueClass = classNames({
    'has-value': hasValue
  });

  const handleInput = e => {
    setInputValue(e.target.value);

    if (e.target.value) {
      setHasValue(true);
    } else {
      setHasValue(false);
    }
  };

  return (
    <div className="input__wrapper">
      {icon && <span className="input__icon">{icon}</span>}

      <input
        className={`input  input--${type}  input--${hasValueClass}`}
        type={type}
        name={name}
        value={inputValue}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        onChange={handleInput}
      />

      {label && <span className="input__label">{label}</span>}
      <span className="input__focus-border" />
    </div>
  );
}
