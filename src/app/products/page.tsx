'use client';

import { useEffect, useState } from 'react';
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

  useEffect(() => {
    if (category) {
      fetchByCategory(category, LIMIT, (page - 1) * LIMIT);
    } else {
      fetchProducts(LIMIT, (page - 1) * LIMIT, search);
    }
  }, [page, search, category, fetchProducts, fetchByCategory]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <ProtectedRoute>
      <Box p={3}>
        <Typography variant='h4' mb={2}>
          Products
        </Typography>

        {/* Search */}
        <TextField
          label='Search Products'
          value={search}
          onChange={(e) => {
            setPage(1);
            setCategory('');
            setSearch(e.target.value);
          }}
          fullWidth
          margin='normal'
        />

        <FormControl fullWidth margin='normal'>
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

        {/* Loading */}
        {loading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={2}>
            {products.map((p) => (
              <Grid key={p.id}>
                <Card
                  sx={{ cursor: 'pointer' }}
                  onClick={() => router.push(`/products/${p.id}`)}
                >
                  <CardMedia
                    component='img'
                    height='140'
                    image={p.thumbnail}
                    alt={p.title}
                  />
                  <CardContent>
                    <Typography variant='h6'>{p.title}</Typography>
                    <Typography>$ {p.price}</Typography>
                    <Typography>Category: {p.category}</Typography>
                    <Typography>Rating: {p.rating}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Pagination */}
        <Box display='flex' justifyContent='center' mt={3}>
          <Pagination
            count={Math.ceil(total / LIMIT)}
            page={page}
            onChange={(_, value) => setPage(value)}
            disabled={!!category}
          />
        </Box>
      </Box>
    </ProtectedRoute>
  );
}
