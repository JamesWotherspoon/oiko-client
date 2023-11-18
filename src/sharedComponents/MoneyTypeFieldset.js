import React from 'react'
import { IconButton } from '@mui/material';
import MoneyInput from './MoneyInput';
import FormError from './FormError';


export default function MoneyTypeFieldset({ transactionType, handleTransactionTypeChange, amount, handleAmountChange, error  }) {
    const onTransactionTypeChange = () => {
      const newTransactionType = transactionType === 'negative' ? 'positive' : 'negative'
      handleTransactionTypeChange(newTransactionType)
    }

  return (
    <div className="transaction-type-amount-cont">
    <IconButton
      onClick={onTransactionTypeChange}
      className="expense-income-btn"
    >
      {transactionType === 'positive' ? (
        <span className="plus">+</span>
      ) : (
        <span className="minus">-</span>
      )}
    </IconButton>
    <MoneyInput
      onChange={handleAmountChange}
      amount={amount}
    />
    <FormError errorMessage={error} />
  </div>
  )
}
