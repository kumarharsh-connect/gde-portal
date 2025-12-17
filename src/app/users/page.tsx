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
  Tab,
} from '@mui/material';

import { useUsersStore } from '@/src/store/usersStore';
import ProtectedRoute from '@/src/components/ProtectedRoute';
import { useRouter } from 'next/navigation';

const LIMIT = 9;

const UsersPage = () => {
  const { users, total, loading, fetchUsers } = useUsersStore();
  const router = useRouter();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchUsers(LIMIT, (page - 1) * LIMIT, search);
  }, [page, search, fetchUsers]);

  return (
    <ProtectedRoute>
      <Box p={3}>
        <Typography variant='h4' mb={2}>
          Users
        </Typography>

        {/* Search */}

        <TextField
          label='Search Users'
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          fullWidth
          margin='normal'
        />

        {/* Loading */}

        {loading ? (
          <CircularProgress />
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Company</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((u) => (
                  <TableRow
                    key={u.id}
                    hover
                    sx={{ cursor: 'pointer' }}
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

        <Box display={'flex'} justifyContent={'center'} mt={2}>
          <Pagination
            count={Math.ceil(total / LIMIT)}
            page={page}
            onChange={(_, value) => setPage(value)}
          />
        </Box>
      </Box>
    </ProtectedRoute>
  );
};

export default UsersPage;
