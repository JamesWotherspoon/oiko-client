import React, { useState, useEffect } from 'react';
import { categoryValidate } from '../../utils/validator';
import { validateHelper, sanitizePayload } from '../../utils/helpers';
import TextField from '../../sharedComponents/TextField';
import TextArea from '../../sharedComponents/TextArea';

const CategoryForm = ({ children, onSubmit, category }) => {
  const initialFormState = {
    name: category?.name || '',
    type: category?.type || '',
    description: category?.description || '',
  };
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors({});
    if (category) {
      setFormData({
        name: category?.name,
      });
    }
  }, [category]);

  const handleChange = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
      <fieldset>
        <TextField
          required
          label="Category name"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          error={errors.name}
        />
      </fieldset>
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
