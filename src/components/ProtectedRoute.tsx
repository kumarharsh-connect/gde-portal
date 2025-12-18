'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <Box className='min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center'>
        <Box className='text-center'>
          <CircularProgress
            size={60}
            className='mb-4 text-primary'
            thickness={4}
          />
          <Typography variant='h6' className='text-gray-600 font-medium'>
            Loading...
          </Typography>
        </Box>
      </Box>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
