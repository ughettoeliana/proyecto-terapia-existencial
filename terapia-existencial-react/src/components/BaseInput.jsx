import React from 'react';

const BaseInput = ({ id, name, type, value, onChange, disabled, required }) => {
  const handleChange = (e) => {
    onChange(e); 
  };

  return (
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={handleChange}
      disabled={disabled}
      required={required}
      className="border border-solid border-gray-300 rounded-md p-1"
    />
  );
};

export default BaseInput;
