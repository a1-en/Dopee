import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Grid, Card, CardMedia, CardContent, CardActionArea, Snackbar, Alert, Modal } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useCart } from './CartContext'; // Import the useCart hook

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '16px',
  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.12)',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  maxWidth: 400,
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
  },
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

const SmartphoneList = () => {
  const [products, setProducts] = useState([]);
  const {setCart } = useCart(); // Use the Cart context
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar state
  const [modalOpen, setModalOpen] = useState(false); // Modal state
  const [selectedProduct, setSelectedProduct] = useState(null); // Selected product state

  useEffect(() => {
    fetch('https://dummyjson.com/products/category/smartphones')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]); // Add the product to the cart
    console.log(`${product.title} added to cart`);
    setSnackbarOpen(true); // Open the Snackbar
    closeModal(); // Close the modal after adding to the cart
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false); // Close the Snackbar
  };

  const openModal = (product) => {
    setSelectedProduct(product); // Set the selected product
    setModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setModalOpen(false); // Close the modal
    setSelectedProduct(null); // Reset selected product
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', my: 4, px: 2 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Smartphones
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={3}>
            <StyledCard>
              <CardActionArea onClick={() => openModal(product)}> {/* Open modal on card click */}
                <CardMedia
                  component="img"
                  image={product.thumbnail}
                  alt={product.title}
                  sx={{
                    height: 200,
                    width: 100,
                    borderRadius: '16px 16px 0 0',
                    objectFit: 'cover',
                    margin: '0 auto',
                  }}
                />
                <CardContent sx={{ padding: 3 }}>
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
                </CardContent>
              </CardActionArea>
              <Box sx={{ p: 2 }}>
                <StyledButton
                  variant="contained"
                  onClick={() => addToCart(product)}
                  fullWidth
                >
                  Add to Cart
                </StyledButton>
              </Box>
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      {/* Snackbar for successful addition to cart */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Position at top center
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{
            backgroundColor: '#4caf50', // Green background
            color: 'white', // White text
            fontWeight: 'bold',
          }}
        >
          Product added to cart!
        </Alert>
      </Snackbar>

      {/* Product Modal */}
      <Modal open={modalOpen} onClose={closeModal}>
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
                image={selectedProduct.thumbnail} // Use a larger image if available
                alt={selectedProduct.title}
                sx={{
                  height: 140,
                  width: 100,
                  borderRadius: '16px 16px 0 0',
                  objectFit: 'cover',
                  margin: '0 auto',
                }}
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
                onClick={() => addToCart(selectedProduct)} // Add product to cart from modal
                fullWidth
              >
                Add to Cart
              </StyledButton>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default SmartphoneList;
