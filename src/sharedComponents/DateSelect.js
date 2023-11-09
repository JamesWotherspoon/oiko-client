import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormError from './FormError';
import { format, parseISO } from 'date-fns';

export default function DateSelect({ label, date,  handleDateChange, error }) {
  const handleOnChange = (newValue) => {
    const formattedDate = format(newValue, 'yyyy-MM-dd');
    handleDateChange(formattedDate)
  };
  return (
    <div>
      <DatePicker
        label={label}
        value={date ? parseISO(date) : null}
        format="dd/MM/yyyy"
        onChange={handleOnChange}
      />
      <FormError errorMessage={error} />
    </div>
  );
}
