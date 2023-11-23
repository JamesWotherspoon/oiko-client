import React, { useState, useEffect, useMemo } from 'react';
import { categoryValidate } from '../../utils/validator';
import { validateHelper, sanitizePayload } from '../../utils/helpers';
import TextField from '../../sharedComponents/TextField';
import TextArea from '../../sharedComponents/TextArea';
import OptionsSelect from '../../sharedComponents/OptionsSelect';
import Category from '@mui/icons-material/Category';
import FormError from '../../sharedComponents/FormError';
import { Select, MenuItem } from '@mui/material';

const CategoryForm = ({ children, onSubmit, category }) => {
  const initialFormState = useMemo(() => {
    return {
    name: category?.name || '',
    type: category?.type || '',
    color: category?.color || '#808080',
    description: category?.description || '',
  }}, [category?.color, category?.description, category?.name, category?.type]);

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  console.log(formData.color)
  useEffect(() => {
    setErrors({});
    if (category) {
      setFormData(initialFormState);
    }
  }, [category, initialFormState]);

  const handleChange = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
    const sanitizedData = sanitizePayload(formData, ['type', 'description']);

    const { valid, errors } = validateHelper(categoryValidate, sanitizedData);
    if (!valid) {
      setErrors(errors);
      return;
    }

    onSubmit(sanitizedData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        required
        label="Category name"
        value={formData.name}
        onChange={(e) => handleChange('name', e.target.value)}
        error={errors.name}
      />
      <div className="options-select-cont">
        <label className="form-sub-heading">
          Color <span className="optional">(optional)</span>
        </label>
        <Select
          name="color"
          value={formData.color}
          variant="standard"
          onChange={(e) => handleChange('color', e.target.value)}
          renderValue={(selected) => (
            <div className='selected-option-cont'>
            <div className="color-display-square" style={{ backgroundColor: selected }}></div>
            {colorData.find((color) => color.hex === selected).name}
            </div>
          )}
        >
          {colorData.map((color) => {
            return (
              <MenuItem key={color.hex} value={color.hex}>
                <div className="color-display-square" style={{ backgroundColor: color.hex }}></div>
                {color.name}
              </MenuItem>
            );
          })}
        </Select>
        <FormError errorMessage={errors.color} />
      </div>
      <TextArea
        label="Description"
        optional
        value={formData.description}
        onChange={(e) => handleChange('description', e.target.value)}
        error={errors.description}
      />
      <div className="submit-btn-cont">{children}</div>
    </form>
  );
};

export default CategoryForm;

const colorData = [
  { hex: '#808080', name: 'Grey' },
  { hex: '#4caf50', name: 'Green' },
  { hex: '#ff9800', name: 'Orange' },
  { hex: '#e91e63', name: 'Pink' },
  { hex: '#673ab7', name: 'Purple' },
  { hex: '#009688', name: 'Teal' },
  { hex: '#795548', name: 'Brown' },
  { hex: '#607d8b', name: 'Blue Grey' },
  { hex: '#af2424', name: 'Dark Red' },
  { hex: '#68e4de', name: 'Turquoise' },
  { hex: '#ff5722', name: 'Deep Orange' },
  { hex: '#3f51b5', name: 'Indigo' },
  { hex: '#ffeb3b', name: 'Amber' },
  { hex: '#8bc34a', name: 'Light Green' },
  { hex: '#00bcd4', name: 'Cyan' },
];
