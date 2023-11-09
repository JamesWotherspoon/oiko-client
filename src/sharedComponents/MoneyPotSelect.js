import React from 'react'
import { Select, MenuItem } from '@mui/material';
import FormError from './FormError';

export default function MoneyPotSelect({ moneyPotId, handleMoneyPotIdChange, moneyPots, error }) {

  return (
    <fieldset>
    <label className="form-sub-heading">Account</label>
    <Select name="moneyPotId" variant="standard" value={moneyPotId} onChange={(e) => handleMoneyPotIdChange(e.target.value)}>
      {moneyPots.map((moneyPot) => (
        <MenuItem key={moneyPot.id} value={moneyPot.id}>
          {moneyPot.name}
        </MenuItem>
      ))}
    </Select>
    <FormError errorMessage={error} />
  </fieldset>
  )
}
