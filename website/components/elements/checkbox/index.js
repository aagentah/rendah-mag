import React, { useState, useEffect } from 'react';

/**
 * A Checkbox.
 */

export default function Checkbox(props) {
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
    <div className="checkbox__wrapper">
      <label
        className="checkbox__control"
        {...(onClick && { onClick: () => onClick(checkedValue) })}
      >
        <input
          type="checkbox"
          className="checkbox__input"
          name={name}
          checked={checkedValue}
          required={required}
          disabled={disabled}
          onChange={handleInput}
        />

        <div className="checkbox__indicator" />
        <span className="checkbox__label">{label}</span>
      </label>
    </div>
  );
}
