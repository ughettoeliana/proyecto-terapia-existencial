import React, { useState } from 'react';

function BaseTextarea({ modelValue, onUpdateModelValue }) {
  const [value, setValue] = useState(modelValue);

  const handleInput = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    onUpdateModelValue(newValue);
  };

  return (
    <textarea
      className="border border-solid border-gray-300 rounded-md p-1 w-full"
      value={value}
      onChange={handleInput}
    ></textarea>
  );
}

export default BaseTextarea;
