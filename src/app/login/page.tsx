'use client';
import { signIn } from 'next-auth/react';
import { Button, Box, TextField } from '@mui/material';
import { useState } from 'react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    await signIn('credentials', {
      username,
      password,
      redirect: true,
      callbackUrl: '/dashboard',
    });
  };

  return (
    <div className='h-screen w-full flex justify-center items-center'>
      <Box className='flex flex-col gap-5'>
        <TextField
          label='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label='Password'
          value={password}
          type='password'
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button onClick={handleLogin}>Login</Button>
      </Box>
    </div>
  );
};

export default LoginPage;
