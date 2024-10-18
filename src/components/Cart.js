import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; // Import the Delete icon
import { useCart } from './CartContext';
import Checkout from './Checkout'; // Import the Checkout component

const Cart = () => {
  const { cart, setCart } = useCart();
  const [isCheckout, setIsCheckout] = useState(false); // State to manage checkout view

  const handleRemoveFromCart = (product) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== product.id));
  };

  const calculateTotal = () => {
    return cart.reduce((total, product) => total + product.price, 0).toFixed(2);
  };

  const handleCheckoutClick = () => {
    setIsCheckout(true); // Set checkout view to true
  };

  const handleBackToCart = () => {
    setIsCheckout(false); // Set checkout view to false
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', my: 4, px: 2 }}>
      {isCheckout ? (
        <Checkout onBack={handleBackToCart} /> // Render Checkout component
      ) : (
        <>
          <Typography variant="h4" align="center" gutterBottom>
            Your Cart
          </Typography>
          {/* Cart Items Section with White Background */}
          <Box sx={{ backgroundColor: 'white', borderRadius: 2, boxShadow: 1, p: 2 }}>
            <List>
              {cart.length === 0 ? (
                <Typography variant="h6" align="center">
                  Your cart is empty.
                </Typography>
              ) : (
                cart.map((product) => (
                  <React.Fragment key={product.id}>
                    <ListItem
                      secondaryAction={
                        <IconButton edge="end" onClick={() => handleRemoveFromCart(product)}>
                          <DeleteIcon /> {/* Use DeleteIcon instead of RemoveIcon */}
                        </IconButton>
                      }
                    >
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <img
                                src={product.thumbnail}
                                alt={product.title}
                                style={{ width: 50, height: 50, borderRadius: '8px', marginRight: '16px' }}
                              />
                              <Typography>{product.title}</Typography>
                            </Box>
                            <Typography variant="body2" sx={{ marginLeft: 'auto' }}>
                              ${product.price.toFixed(2)}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))
              )}
            </List>
            {cart.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" align="right">
                  Total: ${calculateTotal()}
                </Typography>
                <Button
                  onClick={handleCheckoutClick}
                  style={{ backgroundColor: "#e27604" }}
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Checkout
                </Button>
              </Box>
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default Cart;
