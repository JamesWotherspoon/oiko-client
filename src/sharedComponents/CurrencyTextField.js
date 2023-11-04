import React, { useState, useRef } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

const CurrencyTextField = ({...props }) => {
  const [value, setValue] = useState('0.00');
  const inputRef = useRef(null);
  
  const handleKeyDown = (event) => {
    event.preventDefault();
    const input = event.target;
    const { value } = input;
    const selectionLocation = inputRef.current.selectionStart;
    let locationShift = 0;
    console.log(document.activeElement === inputRef.current)
    const skipDecimalSpace = () => {

    };
    const updateValue = (newUnitNumber) => {
      const newValue = value.substring(0, selectionLocation - 1) + newUnitNumber + value.substring(selectionLocation);
      setValue(newValue);
    }

    if ((event.key === 'Backspace' || event.key === 'ArrowLeft') && input.selectionStart === 1) {
      input.setSelectionRange(value.length, value.length);
    } else if (event.key === 'Backspace'){
      updateValue('0');
      locationShift = -1;
    }
    // Use setTimeout to apply new cursor position after render, preventing cursor from jumping to end of input
    setTimeout(() => {
      inputRef.current.setSelectionRange(selectionLocation + locationShift, selectionLocation + locationShift);
    }, 0);
  };


  return (
    <input
      {...props}
      type='text' // Type 'text' to allow setSelectionRange
      ref={inputRef}
      value={value}
      inputMode='decimal'
      onKeyDown={handleKeyDown}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default CurrencyTextField;
