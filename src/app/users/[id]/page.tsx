'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  CircularProgress,
} from '@mui/material';
import ProtectedRoute from '@/src/components/ProtectedRoute';
import { useParams, useRouter } from 'next/navigation';

export default function SingleUserPage() {
  const { id } = useParams(); // id from url
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`https://dummyjson.com/users/${id}`);
      const data = await res.json();

      setUser(data);
      setLoading(false);
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <ProtectedRoute>
      <Box>
        <Button
          variant='outlined'
          onClick={() => {
            router.push('/users');
          }}
        >
          Back to users
        </Button>

        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Typography variant='h5'>
              {user.firstName} {user.lastName}
            </Typography>

            <Typography>Email: {user.email}</Typography>
            <Typography>Gender: {user.gender}</Typography>
            <Typography>Phone: {user.phone}</Typography>
            <Typography>Company: {user.company?.name}</Typography>
          </CardContent>
        </Card>
      </Box>
    </ProtectedRoute>
  );
}
