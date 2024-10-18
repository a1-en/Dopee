import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  CardActionArea,
  Button,
  Pagination,
  Snackbar,
  Alert,
  Modal,
  styled,
} from '@mui/material';
import { useCart } from './CartContext'; // Import the useCart hook

// Styled components for the card and buttons
const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '16px',
  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.12)', // Soft shadow
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  height: '100%', // Ensures all cards are the same height
  width: '100%',  // Ensures all cards are the same width
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between', // Ensure proper content spacing
  '&:hover': {
    transform: 'translateY(-5px)', // Subtle lift effect on hover
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
  },
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 240,               // Set a fixed height for images
  width: '100%',             // Full width image
  objectFit: 'cover',        // Maintain aspect ratio
  borderRadius: '16px 16px 0 0',
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  flexGrow: 1, // Ensures consistent height for content across all cards
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '16px',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  borderRadius: '30px',
  color: 'white',
  padding: '10px 20px',
  fontWeight: 'bold',
  transition: 'background 0.3s ease-in-out',
  '&:hover': {
    background: 'linear-gradient(45deg, #FE6B8B 20%, #FF8E53 80%)',
  },
}));

const StyledPagination = styled(Pagination)(({ theme }) => ({
  '& .MuiPaginationItem-root': {
    borderRadius: '8px',
    margin: '0 4px',
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.text.primary,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    '&.Mui-selected': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
  },
}));

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(30);
  const [totalProducts, setTotalProducts] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { addToCart } = useCart(); // Access addToCart function from context

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${(page - 1) * limit}`);
        const data = await response.json();
        setProducts(data.products);
        setTotalProducts(data.total);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [page, limit]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setSnackbarOpen(true); // Open snackbar for feedback
    handleCloseModal(); // Close modal after adding to cart
  };

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', my: 4, px: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        All Products
      </Typography>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id} display="flex"> {/* Ensuring equal-sized grid items */}
            <StyledCard>
              <CardActionArea onClick={() => handleOpenModal(product)}>
                <StyledCardMedia
                  component="img"
                  image={product.thumbnail}
                  alt={product.title}
                />
                <StyledCardContent>
                  <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                    {product.title}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                      ${product.price.toFixed(2)}
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                      <strong>{product.discountPercentage}% Off</strong>
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Rating:</strong> {product.rating} / 5
                  </Typography>
                </StyledCardContent>
              </CardActionArea>
              <Box sx={{ p: 2 }}>
                <StyledButton
                  variant="contained"
                  onClick={() => handleAddToCart(product)}
                  fullWidth
                >
                  Add to Cart
                </StyledButton>
              </Box>
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      {/* Modal for product details */}
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box sx={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          width: 400, 
          bgcolor: 'background.paper', 
          borderRadius: '16px', 
          boxShadow: 24, 
          p: 4 
        }}>
          {selectedProduct && (
            <>
              <CardMedia
                component="img"
                image={selectedProduct.thumbnail}
                alt={selectedProduct.title}
                sx={{ height: 200, objectFit: 'cover', marginBottom: 2 }}
              />
              <Typography variant="h6" component="h2" gutterBottom>
                {selectedProduct.title}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Price:</strong> ${selectedProduct.price.toFixed(2)}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Description:</strong> {selectedProduct.description}
              </Typography>
              <StyledButton
                variant="contained"
                onClick={() => handleAddToCart(selectedProduct)} // Add to cart from modal
                fullWidth
              >
                Add to Cart
              </StyledButton>
            </>
          )}
        </Box>
      </Modal>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <StyledPagination
          count={Math.ceil(totalProducts / limit)} // Calculate total pages
          page={page}
          onChange={handleChange}
          variant="outlined"
          shape="rounded"
          showFirstButton
          showLastButton
        />
      </Box>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{
            backgroundColor: '#4caf50',
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          Product added to cart!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Shop;
