import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Avatar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

// Styled Hero section container
const HeroContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '80vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#fff',
  textAlign: 'center',
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
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

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
      {/* Placeholder Overlay */}
      {!imageLoaded && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 0,
          }}
        />
      )}
      {/* Preload Image */}
      <img
        src="https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg"
        alt="Hero Background"
        style={{ display: 'none' }} // Hide the image to prevent layout shifts
        onLoad={handleImageLoad}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: imageLoaded
            ? 'url(https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg)'
            : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transition: 'background-image 0.5s ease-in-out',
          zIndex: 0,
        }}
      />
    </HeroContainer>
  );
};

// Sample products data
const initialProducts = [
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
const ProductCard = React.memo(({ product }) => {
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
          loading="lazy"
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
});

// Featured Products Section with loading state
const FeaturedProductsSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate an API call
    const fetchProducts = async () => {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2-second delay
      setProducts(initialProducts);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <Typography variant="h6" align="center">Loading products...</Typography>;
  }

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

// Styled Testimonials section
const TestimonialsContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  backgroundColor: '#e0e0e0',
}));

// Testimonial Card component
const TestimonialCard = ({ testimonial }) => {
  return (
    <Card
      sx={{
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '16px',
        overflow: 'hidden',
        textAlign: 'center',
        backgroundColor: '#fff',
      }}
    >
      <CardContent>
        <Avatar
          src={testimonial.avatar}
          alt={testimonial.name}
          sx={{ width: 60, height: 60, margin: '0 auto', mb: 2 }}
        />
        <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 1 }}>
          "{testimonial.quote}"
        </Typography>
        <Typography variant="h6" component="div" gutterBottom>
          - {testimonial.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {testimonial.role}
        </Typography>
      </CardContent>
    </Card>
  );
};

// Testimonials Section
const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: 'John Doe',
      role: 'Regular Customer',
      quote: 'Dopee has the best products! I always find what I need.',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'Fashion Enthusiast',
      quote: 'I love the variety and quality of the shoes I bought!',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    },
    {
      id: 3,
      name: 'Sam Wilson',
      role: 'Happy Customer',
      quote: 'Great service and fast shipping. Highly recommend!',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    },
  ];

  return (
    <TestimonialsContainer>
      <Typography variant="h4" align="center" gutterBottom>
        What Our Customers Say
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {testimonials.map((testimonial) => (
          <Grid item key={testimonial.id} xs={12} sm={6} md={4}>
            <TestimonialCard testimonial={testimonial} />
          </Grid>
        ))}
      </Grid>
    </TestimonialsContainer>
  );
};

// Landing Page component
const LandingPage = () => {
  return (
    <Box>
      <HeroSection />
      <FeaturedProductsSection />
      <TestimonialsSection />
    </Box>
  );
};

export default LandingPage;
