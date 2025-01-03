import React from 'react';

function TextInput({ label, id, value, onChange, disabled, placeholder }) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        type="text"
        className="form-control"
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        placeholder={placeholder}
      />
    </div>
  );
}

export default TextInput;
