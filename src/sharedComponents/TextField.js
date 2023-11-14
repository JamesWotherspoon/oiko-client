import React from 'react';
import { TextField as MuiTextField} from '@mui/material';
import FormError from './FormError';

export default function TextField({ label, value, onChange, error }) {
  return (
    <div className='options-select-cont'>
      <label className="form-sub-heading">{label}</label>
      <MuiTextField value={value} onChange={onChange} />
      <FormError errorMessage={error} />
    </div>
  );
}
