import React from 'react';
import { TextField as MuiTextField} from '@mui/material';
import FormError from './FormError';

export default function TextField({ label, value, onChange, error, type, optional, required, autocomplete}) {
  return (
    <div className='options-select-cont'>
      <label className="form-sub-heading">{label} {required && '*'}{optional && <span className='optional'>(optional)</span>}</label>
      <MuiTextField value={value} onChange={onChange} type={type}  autoComplete={autocomplete ? 'on' : 'off'} />
      <FormError errorMessage={error} />
    </div>
  );
}
