import React, { useState, useEffect } from 'react';
import { useSessionApi } from '../utils/apiHooks';
import { useAuth } from './authContext';
import { TextField, Button, CircularProgress, Box, Checkbox, FormControlLabel } from '@mui/material';

function getEmailFromStorage() {
  try {
    return localStorage.getItem('rememberedEmail');
  } catch (error) {
    console.error('Failed to access localStorage:', error);
    return '';
  }
}

export default function Login() {
  const rememberedEmail = getEmailFromStorage();
  const [email, setEmail] = useState(rememberedEmail);
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(rememberedEmail !== '');
  const { error, isRequestPending, sendRequest } = useSessionApi();
  const { login } = useAuth();

  useEffect(() => {
    if (!rememberMe) {
      localStorage.removeItem('rememberedEmail');
    }
  }, [rememberMe]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await sendRequest('post', { email, password });
    if (response.status === 200) {
      if (rememberMe) localStorage.setItem('rememberedEmail', email);
      login();
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleLogin}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: 2,
        flexDirection: 'column',
      }}
    >
      <TextField
        id="login-email"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isRequestPending}
        autoComplete="email"
        required
      />
      <TextField
        id="login-password"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isRequestPending}
        autoComplete="current-password"
        required
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            name="rememberMe"
            color="primary"
          />
        }
        label="Remember me"
      />
      <Button type="submit" disabled={isRequestPending}>
        {isRequestPending ? <CircularProgress size={24} /> : 'Login'}
      </Button>
      {error && <div className="Mui-error">Error: {error.message}</div>}
    </Box>
  );
}
