import React, { useState } from 'react';

const MoneyInput = ({amount, onChange}) => {
  const [formattedAmount, setFormattedAmount] = useState(`£ ${amount ? amount : '0.00'}`);

  const formatNumberWithCommas = (value) => {
    let number = value.replace(/,/g, '');
    let [integer, decimal] = number.split('.');
    integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return number.includes('.') ? `${integer}.${decimal}` : integer;
  };

  const handleChange = (e) => {
    const cleanedValue = e.target.value.replace(/[^\d.]/g, '');
    const validAmount = cleanedValue.match(/^\d*\.?\d{0,2}/g);
    let sanitizedAmount = validAmount ? validAmount[0] : '';
    let sanitizedNumber = parseFloat(sanitizedAmount);
    onChange(sanitizedNumber);
    // Insert commas and pound symbol
    let formattedAmount = formatNumberWithCommas(sanitizedAmount);
    formattedAmount = `£ ${formattedAmount}`;
    setFormattedAmount(formattedAmount);
  };

  return (
    <div className='money-input-container'>
      <input
        className='money-input'
        type="text"
        value={formattedAmount}
        onChange={handleChange}
        inputMode="decimal"
        pattern="^£?\s?(\d{1,3}(,\d{3})*|(\d+))(\.\d{0,2})?$"
      />
    </div>
  );
};

export default MoneyInput;
