'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  CircularProgress,
  Grid,
} from '@mui/material';
import ProtectedRoute from '@/src/components/ProtectedRoute';

export default function SingleProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await res.json();

      setProduct(data);
      setLoading(false);
    };

    fetchProducts();
  }, [id]);

  if (loading) {
    return <CircularProgress></CircularProgress>;
  }

  return (
    <ProtectedRoute>
      <Box p={3}>
        <Button variant='outlined' onClick={() => router.push('/products')}>
          Back to products
        </Button>

        <Grid container spacing={3} mt={1}>
          {/* Image */}
          <Grid>
            <Card>
              <CardMedia
                component='img'
                height='300'
                image={product.thumbnail}
                alt={product.title}
              />
            </Card>

            <Grid container spacing={1} mt={1}>
              {product.images?.map((img: string, index: number) => (
                <Grid>
                  <Card>
                    <CardMedia
                      component='img'
                      height='80'
                      image={img}
                      alt={`image-${index}`}
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Details */}
          <Grid>
            <Card>
              <CardContent>
                <Typography variant='h5'>{product.title}</Typography>
                <Typography mt={1}>{product.description}</Typography>
                <Typography mt={2}>Category: {product.category}</Typography>
                <Typography>Price: {product.price}</Typography>
                <Typography>Rating: {product.rating}</Typography>
                <Typography>Stock: {product.stock}</Typography>
                <Typography>Brand: {product.brand}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </ProtectedRoute>
  );
}
