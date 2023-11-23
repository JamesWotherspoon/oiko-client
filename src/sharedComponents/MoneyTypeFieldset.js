import React from 'react';
import { IconButton } from '@mui/material';
import FormError from './FormError';
import { Input, InputAdornment } from '@mui/material';

export default function MoneyTypeFieldset({
  transactionType,
  handleTransactionTypeChange,
  amount,
  handleAmountChange,
  error,
  label,
  optional,
  required,
}) {
  const onTransactionTypeChange = () => {
    const newTransactionType = transactionType === 'negative' ? 'positive' : 'negative';
    handleTransactionTypeChange(newTransactionType);
  };

  return (
    <div className="transaction-type-amount-cont">
      <label htmlFor="amount">
        {label} {required && '*'}
        {optional && <span className="optional">(optional)</span>}
      </label>
      <div className="joint-input-cont">
        <IconButton onClick={onTransactionTypeChange} className="expense-income-btn">
          {transactionType === 'positive' ? <span className="plus">+</span> : <span className="minus">-</span>}
        </IconButton>
        <Input
          variant="standard"
          className="money-input"
          type="text"
          value={amount}
          onChange={(e) => handleAmountChange(e.target.value)}
          inputMode="decimal"
          onKeyDown={(e) => {
            const allowedCharacters = /^[0-9.]+$/; // Allow digits, comma, and period
            const isBackspace = e.key === 'Backspace' || e.code === 'Backspace';
            const isArrowKey = e.key.startsWith('Arrow');
            if (!allowedCharacters.test(e.key) && !isBackspace && !isArrowKey) {
              e.preventDefault();
            }
          }}
          startAdornment={
            <InputAdornment position="start">
              <span className="pound-adornmenet">£</span>
            </InputAdornment>
          }
        />
      </div>
      <FormError errorMessage={error} />
    </div>
  );
}
