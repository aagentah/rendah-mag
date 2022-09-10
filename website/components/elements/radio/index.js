import React, { useState, useEffect } from 'react';

/**
 * A Radio.
 */

export default function Radio(props) {
  const [checkedValue, setCheckedValue] = useState('');

  const {
    /* Options */
    label,
    name,
    checked,
    required,
    disabled,
    onClick
  } = props;

  useEffect(() => {
    if (checked) {
      setCheckedValue(checked);
    }
  }, [checked]);

  const handleInput = e => {
    setCheckedValue(e.target.checked);
  };

  return (
    <div className="radio__wrapper">
      <label
        className="radio__control"
        {...(onClick && { onClick: onClick(checkedValue) })}
      >
        <input
          type="radio"
          className="radio__input"
          name={name}
          checked={checkedValue}
          required={required}
          disabled={disabled}
          onChange={handleInput}
        />

        <div className="radio__indicator" />
        <span className="radio__label">{label}</span>
      </label>
    </div>
  );
}
