import React from 'react';
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
} from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import { styled } from '@mui/material/styles';

// Styled Hero section container
const HeroContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '80vh',
  backgroundImage:
    'url(https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#fff',
  textAlign: 'center',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Lower opacity to not obscure the image as much
  },
}));

const Content = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

// Hero Section
const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <HeroContainer>
      <Content>
        <Typography variant="h2" component="div" gutterBottom>
          Welcome to Dopee
        </Typography>
        <Typography variant="h5" component="div" gutterBottom>
          Best collection of Products for everyone
        </Typography>
        <Button
          style={{ backgroundColor: '#e27604' }}
          variant="contained"
          color="secondary"
          size="large"
          onClick={() => navigate('/shop')}
        >
          Shop Now
        </Button>
      </Content>
    </HeroContainer>
  );
};

// Products data
const products = [
  {
    id: 1,
    title: 'Smart Phones',
    image: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg',
  },
  {
    id: 2,
    title: 'Casual Sneakers',
    image: 'https://images.pexels.com/photos/2529147/pexels-photo-2529147.jpeg',
  },
  {
    id: 3,
    title: 'Bags',
    image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg',
  },
];

// Styled Featured Products section
const FeaturedProducts = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  backgroundColor: '#f5f5f5',
}));

// Product Card component
const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (product.title === 'Smart Phones') {
      navigate('/smartphones');
    } else if (product.title === 'Bags') {
      navigate('/womenBags');
    } else if (product.title === 'Casual Sneakers') {
      navigate('/sneakers');
    }
  };

  return (
    <Card
      sx={{
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '16px',
        overflow: 'hidden',
        transition: 'transform 0.4s ease, box-shadow 0.4s ease',
        '&:hover': {
          transform: 'translateY(-10px)',
          boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          height="260"
          image={product.image}
          alt={product.title}
          sx={{ filter: 'brightness(0.85)', transition: 'filter 0.3s ease' }}
        />
        <CardContent
          sx={{
            backgroundColor: '#fff',
            textAlign: 'center',
            py: 2,
          }}
        >
          <Typography variant="h6" component="div" gutterBottom>
            {product.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

// Featured Products Section
const FeaturedProductsSection = () => {
  return (
    <FeaturedProducts>
      <Typography variant="h4" align="center" gutterBottom>
        Featured Products
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </FeaturedProducts>
  );
};

// Landing Page component
const LandingPage = () => {
  return (
    <Box>
      <HeroSection />
      <FeaturedProductsSection />
    </Box>
  );
};

export default LandingPage;
