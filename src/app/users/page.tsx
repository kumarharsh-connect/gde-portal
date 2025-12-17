'use client';

import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Pagination,
  Box,
  CircularProgress,
  Typography,
} from '@mui/material';

import { useUsersStore } from '@/src/store/usersStore';
import ProtectedRoute from '@/src/components/ProtectedRoute';
import { useRouter } from 'next/navigation';

const LIMIT = 9;

export default function UsersPage() {
  const { users, total, loading, fetchUsers } = useUsersStore();
  const router = useRouter();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchUsers(LIMIT, (page - 1) * LIMIT, search);
  }, [page, search, fetchUsers]);

  return (
    <ProtectedRoute>
      <Box
        p={3}
        sx={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Header */}
        <Box mb={3}>
          <Typography variant='h4' fontWeight={600}>
            Users
          </Typography>
          <Typography color='text.secondary'>
            View and manage registered users
          </Typography>
        </Box>

        {/* Search */}
        <Box mb={2}>
          <TextField
            label='Search users'
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            fullWidth
            size='small'
          />
        </Box>

        {/* Content */}
        {loading ? (
          <Box display='flex' justifyContent='center' mt={4}>
            <CircularProgress />
          </Box>
        ) : users.length === 0 ? (
          <Typography color='text.secondary' mt={4} align='center'>
            No users found
          </Typography>
        ) : (
          <TableContainer component={Paper} elevation={1}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#fafafa' }}>
                  <TableCell>
                    <strong>Name</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Email</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Gender</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Phone</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Company</strong>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {users.map((u) => (
                  <TableRow
                    key={u.id}
                    hover
                    sx={{
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: '#f5f5f5',
                      },
                    }}
                    onClick={() => router.push(`/users/${u.id}`)}
                  >
                    <TableCell>
                      {u.firstName} {u.lastName}
                    </TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>{u.gender}</TableCell>
                    <TableCell>{u.phone}</TableCell>
                    <TableCell>{u.company?.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Pagination */}
        <Box display='flex' justifyContent='center' mt={3}>
          <Pagination
            count={Math.ceil(total / LIMIT)}
            page={page}
            onChange={(_, value) => setPage(value)}
          />
        </Box>
      </Box>
    </ProtectedRoute>
  );
}
