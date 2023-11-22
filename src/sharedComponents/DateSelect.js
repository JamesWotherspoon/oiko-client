import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormError from './FormError';
import { format, parseISO } from 'date-fns';

export default function DateSelect({ label, optional, date, handleDateChange, error }) {
  const handleOnChange = (newValue) => {
    const formattedDate = format(newValue, 'yyyy-MM-dd');
    handleDateChange(formattedDate);
  };
  return (
    <div className="date-picker-cont">
      <label htmlFor="date">{label} {optional && <span className='optional'>(optional)</span>}</label>
      <DatePicker
        id="date"
        value={date ? parseISO(date) : null}
        format="dd/MM/yyyy"
        onChange={handleOnChange}
        className="date-picker"
      />
      <FormError errorMessage={error} />
    </div>
  );
}
