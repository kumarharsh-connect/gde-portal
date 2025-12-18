'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  TextField,
  Pagination,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import ProtectedRoute from '@/src/components/ProtectedRoute';
import { useProductsStore } from '@/src/store/productsStore';

const LIMIT = 8;

export default function ProductsPage() {
  const {
    products,
    total,
    loading,
    categories,
    fetchProducts,
    fetchCategories,
    fetchByCategory,
  } = useProductsStore();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const router = useRouter();

  // Fetch products
  useEffect(() => {
    if (category) {
      fetchByCategory(category, LIMIT, (page - 1) * LIMIT);
    } else {
      fetchProducts(LIMIT, (page - 1) * LIMIT, search);
    }
  }, [page, search, category, fetchProducts, fetchByCategory]);

  // Fetch categories
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const pageCount = useMemo(() => Math.ceil(total / LIMIT), [total]);

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
            Products
          </Typography>
          <Typography color='text.secondary'>
            Browse and manage available products
          </Typography>
        </Box>

        {/* Filters */}
        <Grid container spacing={2} mb={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label='Search products'
              value={search}
              onChange={(e) => {
                setPage(1);
                setCategory('');
                setSearch(e.target.value);
              }}
              fullWidth
              size='small'
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth size='small'>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                label='Category'
                onChange={(e) => {
                  setPage(1);
                  setSearch('');
                  setCategory(e.target.value);
                }}
              >
                <MenuItem value=''>All Categories</MenuItem>
                {categories.map((c, index) => (
                  <MenuItem key={`${c.slug}-${index}`} value={c.slug}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Content */}
        {loading ? (
          <Box display='flex' justifyContent='center' mt={4}>
            <CircularProgress />
          </Box>
        ) : products.length === 0 ? (
          <Typography color='text.secondary' align='center' mt={4}>
            No products found
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {products.map((p) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={p.id}>
                <Card
                  onClick={() => router.push(`/products/${p.id}`)}
                  sx={{
                    cursor: 'pointer',
                    height: '100%',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4,
                    },
                  }}
                >
                  <CardMedia
                    component='img'
                    height='160'
                    image={p.thumbnail}
                    alt={p.title}
                  />
                  <CardContent>
                    <Typography
                      variant='subtitle1'
                      fontWeight={600}
                      gutterBottom
                      noWrap
                    >
                      {p.title}
                    </Typography>

                    <Typography variant='body2' color='text.secondary'>
                      Category: {p.category}
                    </Typography>

                    <Typography mt={1}>
                      <strong>$ {p.price}</strong>
                    </Typography>

                    <Typography variant='body2' color='text.secondary'>
                      Rating: {p.rating}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Pagination */}
        <Box display='flex' justifyContent='center' mt={4}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={(_, value) => setPage(value)}
            disabled={!!category}
          />
        </Box>
      </Box>
    </ProtectedRoute>
  );
}
