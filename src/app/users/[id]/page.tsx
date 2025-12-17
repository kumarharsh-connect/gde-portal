'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Divider,
} from '@mui/material';
import ProtectedRoute from '@/src/components/ProtectedRoute';
import { useParams, useRouter } from 'next/navigation';

export default function SingleUserPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      const res = await fetch(`https://dummyjson.com/users/${id}`);
      const data = await res.json();

      setUser(data);
      setLoading(false);
    };

    fetchUser();
  }, [id]);

  if (loading || !user) {
    return (
      <Box display='flex' justifyContent='center' mt={6}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ProtectedRoute>
      <Box
        p={3}
        sx={{
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        {/* Back Button */}
        <Button
          variant='outlined'
          onClick={() => router.push('/users')}
          sx={{ mb: 2 }}
        >
          Back to users
        </Button>

        {/* User Card */}
        <Card>
          <CardContent>
            {/* Name */}
            <Typography variant='h5' fontWeight={600} gutterBottom>
              {user.firstName} {user.lastName}
            </Typography>

            <Divider sx={{ mb: 2 }} />

            {/* Details */}
            <Box mb={1}>
              <Typography variant='body2' color='text.secondary'>
                Email
              </Typography>
              <Typography>{user.email}</Typography>
            </Box>

            <Box mb={1}>
              <Typography variant='body2' color='text.secondary'>
                Gender
              </Typography>
              <Typography>{user.gender}</Typography>
            </Box>

            <Box mb={1}>
              <Typography variant='body2' color='text.secondary'>
                Phone
              </Typography>
              <Typography>{user.phone}</Typography>
            </Box>

            <Box>
              <Typography variant='body2' color='text.secondary'>
                Company
              </Typography>
              <Typography>{user.company?.name}</Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </ProtectedRoute>
  );
}
