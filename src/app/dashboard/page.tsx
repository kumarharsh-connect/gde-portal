'use client';

import ProtectedRoute from '@/src/components/ProtectedRoute';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';

export default function DashboardPage() {
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
        <Box mb={4}>
          <Typography variant='h4' fontWeight={600}>
            Dashboard
          </Typography>
          <Typography color='text.secondary'>
            Welcome to the GDE Admin Portal
          </Typography>
        </Box>

        {/* Primary Cards */}
        <Grid container spacing={3} mb={3}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Card
              sx={{
                height: '100%',
              }}
            >
              <CardContent>
                <Typography variant='h6'>Users</Typography>
                <Typography color='text.secondary' mt={1}>
                  Manage and view all registered users
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Card
              sx={{
                height: '100%',
              }}
            >
              <CardContent>
                <Typography variant='h6'>Products</Typography>
                <Typography color='text.secondary' mt={1}>
                  Browse products with filters and details
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Secondary Info Row */}
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <Card
              sx={{
                backgroundColor: '#fafafa',
              }}
            >
              <CardContent>
                <Typography variant='subtitle1' fontWeight={500}>
                  Quick Tip
                </Typography>
                <Typography color='text.secondary' mt={1}>
                  Use the navigation menu to switch between Users and Products
                  sections efficiently.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </ProtectedRoute>
  );
}
