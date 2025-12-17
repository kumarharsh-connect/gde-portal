'use client';

import { signIn } from 'next-auth/react';
import {
  Button,
  Box,
  TextField,
  Paper,
  Typography,
  Container,
} from '@mui/material';
import { useState } from 'react';

export default function LoginPage() {
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

  const handleTestLogin = async () => {
    setUsername('emilys');
    setPassword('emilyspass');

    await signIn('credentials', {
      username: 'emilys',
      password: 'emilyspass',
      redirect: true,
      callbackUrl: '/dashboard',
    });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#f4f6f8',
      }}
    >
      <Container maxWidth='sm'>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
          }}
        >
          {/* Header */}
          <Box textAlign='center' mb={4}>
            <Typography variant='h4' fontWeight={600}>
              GDE Admin Portal
            </Typography>
            <Typography variant='body2' color='text.secondary' mt={1}>
              Sign in to manage users and products
            </Typography>
          </Box>

          {/* Form */}
          <Box display='flex' flexDirection='column' gap={3}>
            <TextField
              label='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
            />

            <TextField
              label='Password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />

            <Button variant='contained' size='large' onClick={handleLogin}>
              Sign In
            </Button>

            <Button
              fullWidth
              variant='outlined'
              sx={{ mt: 2 }}
              onClick={handleTestLogin}
            >
              Login with Test Credentials
            </Button>

            <Typography
              variant='caption'
              display='block'
              align='center'
              sx={{ mt: 1, color: 'text.secondary' }}
            >
              For demo purposes only
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
