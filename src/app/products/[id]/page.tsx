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
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await res.json();

      setProduct(data);
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading || !product) {
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
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Back Button */}
        <Button
          variant='outlined'
          onClick={() => router.push('/products')}
          sx={{ mb: 3 }}
        >
          Back to products
        </Button>

        <Grid container spacing={4}>
          {/* Images Section */}
          <Grid size={{ xs: 12, md: 6 }}>
            {/* Main Image */}
            <Card>
              <Box
                sx={{
                  height: 180,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                <CardMedia
                  component='img'
                  image={product.thumbnail}
                  alt={product.title}
                  sx={{
                    maxHeight: '100%',
                    maxWidth: '100%',
                    objectFit: 'contain',
                  }}
                />
              </Box>
            </Card>

            {/* Thumbnails */}
            <Grid container spacing={1} mt={1}>
              {product.images?.map((img: string, index: number) => (
                <Grid size={{ xs: 3 }} key={index}>
                  <Card
                    sx={{
                      cursor: 'pointer',
                      '&:hover': {
                        boxShadow: 3,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        height: 60,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                      }}
                    >
                      <CardMedia
                        component='img'
                        image={img}
                        alt={`image-${index}`}
                        sx={{
                          maxHeight: '100%',
                          maxWidth: '100%',
                          objectFit: 'contain',
                        }}
                      />
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Details Section */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant='h5' fontWeight={600} gutterBottom>
                  {product.title}
                </Typography>

                <Typography color='text.secondary' mb={2}>
                  {product.description}
                </Typography>

                <Typography>
                  <strong>Category:</strong> {product.category}
                </Typography>

                <Typography>
                  <strong>Brand:</strong> {product.brand}
                </Typography>

                <Typography>
                  <strong>Price:</strong> $ {product.price}
                </Typography>

                <Typography>
                  <strong>Rating:</strong> {product.rating}
                </Typography>

                <Typography>
                  <strong>Stock:</strong> {product.stock}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </ProtectedRoute>
  );
}
