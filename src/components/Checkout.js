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
  FormHelperText,
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PublicIcon from '@mui/icons-material/Public';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonIcon from '@mui/icons-material/Person';
import PaymentIcon from '@mui/icons-material/Payment';
import { useCart } from './CartContext';

const Checkout = ({ onBack }) => {
  const { cart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    address: '',
    city: '',
    zip: '',
    country: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const calculateTotal = () =>
    cart.reduce((total, product) => total + product.price, 0).toFixed(2);

  const handlePlaceOrder = () => {
    let validationErrors = {};
    if (!name) validationErrors.name = 'Name is required';
    if (!address) validationErrors.address = 'Address is required';
    if (!city) validationErrors.city = 'City is required';
    if (!zip) validationErrors.zip = 'Zip Code is required';
    if (!country) validationErrors.country = 'Country is required';

    if (paymentMethod === 'credit_debit') {
      if (!cardNumber) validationErrors.cardNumber = 'Card Number is required';
      if (!expiryDate) validationErrors.expiryDate = 'Expiry Date is required';
      if (!cvv) validationErrors.cvv = 'CVV is required';
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);

  return (
    <Box
      sx={{
        maxWidth: 700,
        mx: 'auto',
        my: 4,
        p: 3,
        backgroundColor: 'white',
        borderRadius: 3,
        boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="h4" align="center" sx={{ mb: 3 }}>
        Checkout
      </Typography>

      <Box sx={{ backgroundColor: '#f9f9f9', p: 2, borderRadius: 2 }}>
        <List>
          {cart.map((product) => (
            <ListItem key={product.id} sx={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={product.thumbnail}
                alt={product.title}
                style={{ width: 60, height: 60, borderRadius: '8px', marginRight: 16 }}
              />
              <ListItemText
                primary={product.title}
                secondary={`$${product.price.toFixed(2)}`}
              />
            </ListItem>
          ))}
        </List>
        <Typography variant="h6" align="right" sx={{ mt: 2 }}>
          Total: <strong>${calculateTotal()}</strong>
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        Payment Method
      </Typography>
      <RadioGroup
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
        row
        sx={{ justifyContent: 'space-between', mb: 2 }}
      >
        <FormControlLabel
          value="cod"
          control={<Radio />}
          label="Cash on Delivery"
        />
        <FormControlLabel
          value="credit_debit"
          control={<Radio />}
          label="Credit/Debit Card"
        />
        <FormControlLabel value="ewallet" control={<Radio />} label="E-Wallet" />
      </RadioGroup>

      {paymentMethod === 'credit_debit' && (
        <Box sx={{ backgroundColor: '#f9f9f9', p: 2, borderRadius: 2, mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Payment Information <PaymentIcon />
          </Typography>
          <TextField
            label="Card Number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            error={!!errors.cardNumber}
            helperText={errors.cardNumber}
            InputProps={{ startAdornment: <CreditCardIcon sx={{ mr: 1 }} /> }}
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Expiry Date (MM/YY)"
              variant="outlined"
              fullWidth
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              error={!!errors.expiryDate}
              helperText={errors.expiryDate}
            />
            <TextField
              label="CVV"
              variant="outlined"
              fullWidth
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              error={!!errors.cvv}
              helperText={errors.cvv}
            />
          </Box>
        </Box>
      )}

      <Typography variant="h6" sx={{ mb: 2 }}>
        Personal Information <PersonIcon />
      </Typography>
      <TextField
        label="Full Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={!!errors.name}
        helperText={errors.name}
        InputProps={{ startAdornment: <PersonIcon sx={{ mr: 1 }} /> }}
      />
      <TextField
        label="Address"
        variant="outlined"
        fullWidth
        margin="normal"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        error={!!errors.address}
        helperText={errors.address}
        InputProps={{ startAdornment: <HomeIcon sx={{ mr: 1 }} /> }}
      />
      <TextField
        label="City"
        variant="outlined"
        fullWidth
        margin="normal"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        error={!!errors.city}
        helperText={errors.city}
        InputProps={{ startAdornment: <LocationCityIcon sx={{ mr: 1 }} /> }}
      />
      <TextField
        label="Zip Code"
        variant="outlined"
        fullWidth
        margin="normal"
        value={zip}
        onChange={(e) => setZip(e.target.value)}
        error={!!errors.zip}
        helperText={errors.zip}
        InputProps={{ startAdornment: <MailOutlineIcon sx={{ mr: 1 }} /> }}
      />
      <FormControl fullWidth margin="normal" error={!!errors.country}>
        <InputLabel>Country</InputLabel>
        <Select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          startAdornment={<PublicIcon sx={{ mr: 1 }} />}
        >
          <MenuItem value="USA">USA</MenuItem>
          <MenuItem value="Canada">Canada</MenuItem>
          <MenuItem value="UK">UK</MenuItem>
        </Select>
        {errors.country && <FormHelperText>{errors.country}</FormHelperText>}
      </FormControl>

      <Button
        onClick={handlePlaceOrder}
        fullWidth
        sx={{
          mt: 3,
          py: 1.5,
          backgroundColor: '#003366',
          color: 'white',
          '&:hover': { backgroundColor: '#002244' },
        }}
        variant="contained"
      >
        Place Order
      </Button>
      <Button onClick={onBack} fullWidth sx={{ mt: 2 }}>
        Back to Cart
      </Button>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="Order placed successfully!"
      />
    </Box>
  );
};

export default Checkout;
