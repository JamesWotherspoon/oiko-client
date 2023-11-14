import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import TextField from '../../sharedComponents/TextField';
import { userSlice } from '../../utils/slices';
import { credentialsValidate} from '../../utils/validator';
import { validateHelper } from '../../utils/helpers';

export default function SignUpForm({ handleSignUp }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [validationErrors, setValidationErrors ] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    let { valid, errors } = validateHelper(credentialsValidate, formData);

    if (formData.password !== formData.confirmPassword) {
      valid = false;
      errors.confirmPassword = 'Passwords do not match';
    }
    if(!valid){
      console.log(errors)
      setValidationErrors(errors)
      return
    }
    handleSignUp(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
        error={validationErrors?.email}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
        error={validationErrors?.password}
      />
      <TextField
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
        error={validationErrors?.confirmPassword}
      />
      <button type="submit">SignUp</button>
    </form>
  );
}
