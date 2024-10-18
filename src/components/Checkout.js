// src/components/Checkout.js
import React, { useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  FormControlLabel,
  Snackbar,
} from '@mui/material';
import { useCart } from './CartContext';

const Checkout = ({ onBack }) => {
  const { cart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState(''); // State for payment method
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState('');

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const calculateTotal = () => {
    return cart.reduce((total, product) => total + product.price, 0).toFixed(2);
  };

  const handlePlaceOrder = () => {
    // Here you can add your order placement logic (API call, etc.)
    
    // Show the Snackbar
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', my: 4, px: 2, backgroundColor: 'white', borderRadius: 2, boxShadow: 1 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Checkout
      </Typography>
      
      {/* Cart Section with White Background */}
      <Box sx={{ backgroundColor: 'white', borderRadius: 2, boxShadow: 1, p: 2 }}>
        <List>
          {cart.map((product) => (
            <ListItem key={product.id}>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      style={{ width: 50, height: 50, borderRadius: '8px', marginRight: '16px' }}
                    />
                    {product.title}
                  </Box>
                }
                secondary={`$${product.price.toFixed(2)}`}
              />
            </ListItem>
          ))}
        </List>
        <Typography variant="h6" align="right">
          Total: ${calculateTotal()}
        </Typography>
      </Box>
      <Divider sx={{ my: 2 }} />

      {/* Payment Method Selection using Radio Buttons */}
      <Typography variant="h6" gutterBottom>
        Payment Method
      </Typography>
      <RadioGroup
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
        row
      >
        <FormControlLabel value="cod" control={<Radio />} label="Cash on Delivery" />
        <FormControlLabel value="credit_debit" control={<Radio />} label="Credit/Debit Card" />
        <FormControlLabel value="ewallet" control={<Radio />} label="E-Wallet" />
      </RadioGroup>

      {/* Conditionally render Payment Information based on selected method */}
      {paymentMethod === 'credit_debit' && (
        <Box sx={{ backgroundColor: 'white', borderRadius: 2, boxShadow: 1, p: 2, mt: 2 }}>
          <Typography variant="h5" gutterBottom>
            Payment Information
          </Typography>

          <TextField
            label="Card Number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Expiry Date (MM/YY)"
              variant="outlined"
              fullWidth
              margin="normal"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
            <TextField
              label="CVV"
              variant="outlined"
              fullWidth
              margin="normal"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
          </Box>
        </Box>
      )}

      {/* Personal Information Section */}
      <Box sx={{ backgroundColor: 'white', borderRadius: 2, boxShadow: 1, p: 2, mt: 3 }}>
        <Typography variant="h5" gutterBottom>
          Personal Information
        </Typography>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Address"
          variant="outlined"
          fullWidth
          margin="normal"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <TextField
          label="City"
          variant="outlined"
          fullWidth
          margin="normal"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <TextField
          label="Zip Code"
          variant="outlined"
          fullWidth
          margin="normal"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Country</InputLabel>
          <Select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <MenuItem value="USA">USA</MenuItem>
            <MenuItem value="Canada">Canada</MenuItem>
            <MenuItem value="UK">UK</MenuItem>
            {/* Add more countries as needed */}
          </Select>
        </FormControl>
      </Box>

      <Button style={{ backgroundColor: '#e27604' }} variant="contained" sx={{ mt: 2, color: 'white' }} onClick={handlePlaceOrder}>
        Place Order
      </Button>
      <Button onClick={onBack} variant="outlined" sx={{ mt: 2, mr: 4 }}>
        Back to Cart
      </Button>

      {/* Snackbar for order confirmation */}
      <Snackbar
  open={snackbarOpen}
  onClose={handleSnackbarClose}
  message="Order placed successfully!"
  autoHideDuration={3000} // Snackbar will auto-hide after 3 seconds
  anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Position at the top center
  ContentProps={{
    style: {
      backgroundColor: 'green', // Change the background color to green
      color: 'white', // Optional: change text color to white for better contrast
    },
  }}
/>

    </Box>
  );
};

export default Checkout;
