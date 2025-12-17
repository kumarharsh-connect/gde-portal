'use client';

import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import App from 'next/app';

export default function Navbar() {
  const { status } = useSession();

  // Don't show navbar while the session is loading or on login page
  if (status !== 'authenticated') return null;

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography>GDE Portal</Typography>
        <Box>
          <Button>Logout</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
