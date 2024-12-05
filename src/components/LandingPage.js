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
  Badge,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Star } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Images imports
import image from '../images/1.png';
import image2 from '../images/3.jpg';
import image3 from '../images/4.jpg';
import image4 from '../images/5.jpg';
import image5 from '../images/6.jpg';
import image6 from '../images/7.jpg';
import image7 from '../images/8.jpg';
import image8 from '../images/9.jpg';

// Styled Hero Section
const HeroSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  padding: theme.spacing(4),
  backgroundColor: '#b7e9f7',
  [theme.breakpoints.down('md')]: {
    justifyContent: 'center',
  },
}));

const HeroTextContainer = styled(Box)(({ theme }) => ({
  maxWidth: '50%',
  [theme.breakpoints.down('md')]: {
    maxWidth: '100%',
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
}));

const HeroImage = styled('img')(({ theme }) => ({
  width: '40%',
  borderRadius: '10px',
  [theme.breakpoints.down('md')]: {
    width: '80%',
  },
}));

// Categories Section
const CategoriesContainer = styled(Grid)(({ theme }) => ({
  margin: theme.spacing(4, 0),
}));

const CategoryCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  backgroundColor: '#f9f9f9',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
}));

// Styled Featured Items Section
const FeaturedSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
}));

const ProductCard = styled(Card)(({ theme }) => ({
  maxWidth: 300,
  margin: theme.spacing(2),
  textAlign: 'center',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  position: 'relative',
}));

const StarRating = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: theme.spacing(1),
}));

// Hero Section Component
const Hero = () => {
  const navigate = useNavigate();

  return (
    <HeroSection>
      <HeroTextContainer>
        <Typography variant="h4" gutterBottom>
          Up to 70% off on Black Friday
        </Typography>
        <Typography variant="h5" gutterBottom>
          TRENDY FASHION COLLECTION
        </Typography>
        <Button onClick={() => navigate('/shop')} variant="contained" sx={{ backgroundColor: '#003366' }} size="large">
          Buy Now
        </Button>
      </HeroTextContainer>
      <HeroImage src={image} alt="Fashion Sale" />
    </HeroSection>
  );
};

// Categories Component
const Categories = () => {
  const categories = [
    { title: 'Bundle Package', offer: 'Save 30%', image: image2 },
    { title: 'Valentines Offer', offer: '30% Sale', image: image3 },
    { title: 'Relax Chair', offer: 'New Arrival', image: image4 },
  ];

  const navigate = useNavigate();

  const handleSeeAllClick = () => {
    navigate('/shop');
  };

  return (
    <CategoriesContainer container spacing={3} justifyContent="center">
      {categories.map((category, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <CategoryCard>
            <img
              src={category.image}
              alt={category.title}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                borderRadius: '8px',
              }}
            />
            <Typography variant="h6">{category.title}</Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#003366',
                fontWeight: 'bold',
                fontSize: '1.2rem',
              }}
            >
              {category.offer}
            </Typography>
            <Button variant="contained" color="secondary" onClick={handleSeeAllClick}>
              See All
            </Button>
          </CategoryCard>
        </Grid>
      ))}
    </CategoriesContainer>
  );
};

// Featured Items Component
const FeaturedItems = () => {
  const products = [
    {
      id: 2,
      title: 'Smartphone',
      price: '$500.00',
      oldPrice: '$40.00',
      image: image7,
      rating: 4,
      path: '/smartphone',
    },
    {
      id: 1,
      title: 'Modern Chair',
      price: '$20.00',
      oldPrice: '$40.00',
      image: image6,
      rating: 4,
      path: '/modern-chair',
    },
   
    {
      id: 3,
      title: 'Shoes',
      price: '$20.00',
      oldPrice: '$40.00',
      image: image5,
      rating: 4,
      path: '/sneakers',
    },
    {
      id: 4,
      title: 'Bags',
      price: '$20.00',
      oldPrice: '$40.00',
      image: image8,
      rating: 4,
      path: '/womenBags',
    },
  ];

  const navigate = useNavigate();

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <FeaturedSection>
      <Typography variant="h4" align="center" gutterBottom>
        Featured Items
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductCard onClick={() => handleCardClick(product.path)}>
              <Badge
                badgeContent="-30%"
                color="error"
                sx={{
                  position: 'absolute',
                  top: 10,
                  left: 20,
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  backgroundColor: '#003366',
                  color: '#fff',
                }}
              />
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.title}
                />
                <CardContent>
                  <Typography variant="h6">{product.title}</Typography>
                  <StarRating>
                    {[...Array(product.rating)].map((_, index) => (
                      <Star key={index} sx={{ color: 'orange' }} />
                    ))}
                  </StarRating>
                  <Typography variant="body2" color="text.secondary">
                    <del>{product.oldPrice}</del>
                    <Typography variant="h6" sx={{ color: '#00bcd4', fontSize: '1.25rem' }}>
                      {product.price}
                    </Typography>
                  </Typography>
                </CardContent>
              </CardActionArea>
            </ProductCard>
          </Grid>
        ))}
      </Grid>
    </FeaturedSection>
  );
};

// Landing Page Component
const LandingPage = () => {
  return (
    <Box>
      <Hero />
      <Categories />
      <FeaturedItems />
    </Box>
  );
};

export default LandingPage;
