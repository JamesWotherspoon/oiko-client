import React, { useState, useEffect } from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';
import TextField from '../../sharedComponents/TextField';
import { credentialsValidate} from '../../utils/validator';
import { validateHelper } from '../../utils/helpers';

const getEmailFromStorage = () => {
  try {
    return localStorage.getItem('rememberedEmail') || '';
  } catch (error) {
    console.error('Failed to access localStorage:', error);
    return '';
  }
};

export default function LoginForm({ handleLogin }) {
  const rememberedEmail = getEmailFromStorage();
  const [formData, setFormData] = useState({
    email: rememberedEmail,
    password: '',
    rememberMe: !!rememberedEmail,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!formData.rememberMe) {
      localStorage.removeItem('rememberedEmail');
    }
  }, [formData.rememberMe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.rememberMe) {
      localStorage.setItem('rememberedEmail', formData.email);
    }

    handleLogin(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
        error={errors.email}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
        error={errors.password}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={formData.rememberMe}
            onChange={(e) => setFormData((prev) => ({ ...prev, rememberMe: e.target.checked }))}
          />
        }
        label="Remember Me"
      />
      <button type="submit">Login</button>
    </form>
  );
}
