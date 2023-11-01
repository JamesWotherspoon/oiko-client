import React, { useState } from 'react';
import { useUserApi } from '../../utils/apiHooks';
import { useAuth } from './authContext';
import Input from '../../sharedComponents/Input';
import Button from '../../sharedComponents/Button';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const { error, isRequestPending, sendRequest } = useUserApi();

  const handleRegistration = async (e) => {
    const response = await sendRequest('post', { email, password });
    if (response.status === 201) login();
  };

  return (
    <div>
      {isRequestPending ? <div>Processing request</div> : null}
      {error ? <div>Error</div> : null}

      {/* Registration form */}
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
        <Button
          text={isRequestPending ? 'Registering...' : 'Register'}
          onClick={handleRegistration}
          disabled={isRequestPending}
        />
      </form>
    </div>
  );
}
