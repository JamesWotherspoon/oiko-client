import React from 'react';
import { TextareaAutosize as MuiTextarea } from '@mui/material';
import FormError from './FormError';

export default function TextArea({ label, value, onChange, error, optional }) {
  return (
    <div className='options-select-cont'>
      <label className="form-sub-heading">{label} {optional && <span className='optional'>(optional)</span>}</label>
      <MuiTextarea
        value={value}
        onChange={onChange}
        rows={4} // Set the number of rows as needed
        aria-label={label}
        style={{ overflow: 'visible' }}
      />
      <FormError errorMessage={error} />
    </div>
  );
}