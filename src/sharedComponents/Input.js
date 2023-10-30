import React from "react";
import PropTypes from 'prop-types';

function Input({ type, value, onChange, disabled, label }) {
  return (
    <div>
      {label && <label>{label}:</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
}

Input.prototype = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  label: PropTypes.string,
};

Input.defaultProps = {
  disabled: false,
  label: "",
};

export default Input;
