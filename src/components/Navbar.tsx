'use client';

import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { memo, useCallback } from 'react';

function Navbar() {
  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = useCallback(() => {
    signOut({ callbackUrl: '/login' });
  }, []);

  if (status !== 'authenticated') return null;

  const navButton = (label: string, path: string) => (
    <Button
      color='inherit'
      onClick={() => router.push(path)}
      sx={{
        fontWeight: pathname === path ? 600 : 400,
        borderBottom: pathname === path ? '2px solid white' : 'none',
        borderRadius: 0,
      }}
    >
      {label}
    </Button>
  );

  return (
    <AppBar position='sticky' elevation={1}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left: Title */}
        <Typography
          variant='h6'
          sx={{ fontWeight: 600, cursor: 'pointer' }}
          onClick={() => router.push('/dashboard')}
        >
          GDE Portal
        </Typography>

        {/* Center: Navigation Buttos */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          {navButton('Dashboard', '/dashboard')}
          {navButton('Users', '/users')}
          {navButton('Products', '/products')}
        </Box>

        {/* Right: Logout Button */}
        <Button variant='outlined' color='inherit' onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default memo(Navbar);
