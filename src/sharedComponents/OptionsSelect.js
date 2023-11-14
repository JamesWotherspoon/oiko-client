import React from 'react';
import { Select, MenuItem } from '@mui/material';
import FormError from './FormError';

export default function OptionsSelect({ label, selectedId, handleSelectedIdChange, options, error }) {
  const renderOptions = () => {
    return options.map((option) => {
      const isObjectOrArray = typeof option === 'object' && option !== null;
      const value = isObjectOrArray ? ('id' in option && option.id) : option;
      const valueLabel = isObjectOrArray ? ('name' in option && option.name) : option;
      return (
        <MenuItem key={value + valueLabel} value={value}>
          {valueLabel}
        </MenuItem>
      );
    });
  };

  return (
    <div className="options-select-cont">
      <label className="form-sub-heading">{label}</label>
      <Select
        name="selectId"
        variant="standard"
        value={selectedId || ''}
        onChange={(e) => handleSelectedIdChange(e.target.value)}
      >
      {renderOptions()}
      </Select>
      <FormError errorMessage={error} />
    </div>
  );
}
