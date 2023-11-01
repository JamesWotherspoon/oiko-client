import React, { useState } from 'react';
import { useSessionApi } from '../../utils/apiHooks';
import { useAuth } from './authContext';
import Input from '../../sharedComponents/Input';
import Button from '@mui/material/Button';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { error, isRequestPending, sendRequest } = useSessionApi();
  const { login } = useAuth();

  const handleLogin = async () => {
    const response = await sendRequest('post', { email, password });
    if (response.status === 200) login();
  };

  return (
    <div>
      {isRequestPending ? <div>Processing request</div> : null}
      {error ? <div>Error</div> : null}
      <form>
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isRequestPending}
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isRequestPending}
        />
        <Button variant="contained" onClick={handleLogin} disabled={isRequestPending}>
          {isRequestPending ? 'Logging In...' : 'Login'}
        </Button>
      </form>
    </div>
  );
}
