import React, { useState } from 'react';
import { useUserApi } from '../../utils/apiHooks';
import { useAuth } from './authContext';
import { Box, TextField, Button, CircularProgress } from '@mui/material';

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const { error, isRequestPending, sendRequest } = useUserApi();

  const handleRegistration = async (e) => {
    const response = await sendRequest('post', { firstName, lastName, email, password });
    if (response.status === 201) login();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {error ? <div>Error</div> : null}

      {/* Registration form */}
      <Box
        component="form"
        onSubmit={handleRegistration}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <TextField
          id="reg-first-name"
          label="First Name"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          disabled={isRequestPending}
          required
          autoComplete="given-name"
        />
        <TextField
          id="reg-last-name"
          label="Last Name"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          disabled={isRequestPending}
          required
          autoComplete="family-name"
        />
        <TextField
          id="reg-email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isRequestPending}
          required
          autoComplete="email"
        />
        <TextField
          id="reg-password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isRequestPending}
          required
          autoComplete="new-password"
        />
        <TextField
          id="confirm-password"
          label="Confirm Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isRequestPending}
          required
          autoComplete="new-password"
        />
        <Button type="submit" disabled={isRequestPending}>
          {isRequestPending ? <CircularProgress size={24} /> : 'Create an account'}
        </Button>
      </Box>
    </Box>
  );
}
