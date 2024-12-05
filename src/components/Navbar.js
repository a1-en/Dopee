import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  InputBase,
  Box,
  styled,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  Badge,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Modal,
  TextField,
  Snackbar,
  Alert
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useCart } from './CartContext';

// Styled components
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#fff',
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#000',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'black',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
    borderRadius: theme.shape.borderRadius,
    border: '1px solid #ccc',
    transition: 'border-color 0.3s ease',
    '&:focus': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

// Debounce function
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const Navbar = () => {
  const navigate = useNavigate();
  const { cart, setCart } = useCart();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  useEffect(() => {
    if (debouncedSearchQuery) {
      fetch(`https://dummyjson.com/products/search?q=${debouncedSearchQuery}`)
        .then((res) => res.json())
        .then((data) => {
          setSearchResults(data.products);
        })
        .catch((err) => console.error('Fetch error:', err));
    } else {
      setSearchResults([]);
      setSelectedProduct(null);
      setModalOpen(false);
    }
  }, [debouncedSearchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

const handleAddToCart = () => {
    // Add selected product to the cart
    setCart([...cart, selectedProduct]);
    
    // Clear the search field
    setSearchQuery('');
    setSnackbarOpen(true);

    // Close the modal
    setModalOpen(false);
  };
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  const handleContactFormChange = (event) => {
    const { name, value } = event.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = (event) => {
    event.preventDefault();
    console.log('Contact Form Submitted:', contactForm);
    setContactForm({ name: '', email: '', message: '' });
    setContactModalOpen(false);
  };

  const drawerContent = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
      <List>
        <ListItem button onClick={() => navigate('/')}>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={() => navigate('/shop')}>
          <ListItemText primary="Shop" />
        </ListItem>
        <ListItem button onClick={() => navigate('/Women')}>
          <ListItemText primary="Women" />
        </ListItem>
        <ListItem button onClick={() => navigate('/Mens')}>
          <ListItemText primary="Mens" />
        </ListItem>
      
      
        <ListItem button onClick={() => setContactModalOpen(true)}>
          <ListItemText primary="Contact Us" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" sx={{ background: '#003366' }}>
        <Toolbar>
          {isMobile ? (
            <>
              <IconButton color="inherit" edge="start" onClick={toggleDrawer} sx={{ mr: 2 }}>
                <MenuIcon />
              </IconButton>
              <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
                {drawerContent}
              </Drawer>
            </>
          ) : (
            <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', fontSize: '24px' }}>
              Dopee
            </Typography>
          )}

          {!isMobile && (
           <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
           <Button 
             color="inherit" 
             sx={{ 
               '&:hover': { 
                 borderBottom: '2px solid #add8e6'  // Light blue line on hover
               } 
             }} 
             onClick={() => setContactModalOpen(true)}>
             Contact Us
           </Button>
           <Button 
             color="inherit" 
             sx={{ 
               '&:hover': { 
                 borderBottom: '2px solid #add8e6'  // Light blue line on hover
               } 
             }} 
             onClick={() => navigate('/')}>
             Home
           </Button>
           <Button 
             color="inherit" 
             sx={{ 
               '&:hover': { 
                 borderBottom: '2px solid #add8e6'  // Light blue line on hover
               } 
             }} 
             onClick={() => navigate('/shop')}>
             Shop
           </Button>
           <Button 
             color="inherit" 
             sx={{ 
               '&:hover': { 
                 borderBottom: '2px solid #add8e6'  // Light blue line on hover
               } 
             }} 
             onClick={() => navigate('/Women')}>
             Women
           </Button>
           <Button 
             color="inherit" 
             sx={{ 
               '&:hover': { 
                 borderBottom: '2px solid #add8e6'  // Light blue line on hover
               } 
             }} 
             onClick={() => navigate('/Mens')}>
             Mens
           </Button>
         </Box>
         
          )}

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Search>
          <IconButton color="inherit" onClick={() => navigate('/cart')}>
            <Badge badgeContent={cart.length} color="black">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
        {searchResults.length > 0 && (
          <Box sx={{ backgroundColor: '#fff', padding: 2, mt: 1 }}>
            <Grid container spacing={2}>
              {searchResults.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <Card onClick={() => handleProductClick(product)} sx={{ cursor: 'pointer', boxShadow: 3 }}>
                    <CardMedia
                      component="img"
                      height="80"
                      sx={{ objectFit: 'contain', width: 'auto', margin: '0 auto' }}
                      image={product.images[0]}
                      alt={product.title}
                    />
                    <CardContent>
                      <Typography variant="h6">{product.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {product.description.slice(0, 50)}...
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </AppBar>
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          {selectedProduct && (
            <>
             <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
    <img 
      src={selectedProduct.thumbnail} // Assuming the image URL is in the selectedProduct object
      alt={selectedProduct.title} 
      style={{ maxWidth: '60%', height: 'auto' }} // Adjust as needed
    />
  </Box>
              <Typography variant="h6" component="h2">
                {selectedProduct.title}
              </Typography>
              <Typography variant="body2">{selectedProduct.description}</Typography>
              <Button onClick={handleAddToCart} variant="contained"  fullWidth sx={{ mt: 2 , backgroundColor:'#003366' }}>
                Add to Cart
              </Button>
            </>
          )}
        </Box>
      </Modal>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Added to Cart
        </Alert>
      </Snackbar>

      <Modal open={contactModalOpen} onClose={() => setContactModalOpen(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6">Contact Us</Typography>
          <form onSubmit={handleContactSubmit}>
            <TextField
              name="name"
              label="Your Name"
              variant="outlined"
              fullWidth
              value={contactForm.name}
              onChange={handleContactFormChange}
              sx={{ mt: 2 }}
            />
            <TextField
              name="email"
              label="Your Email"
              variant="outlined"
              fullWidth
              value={contactForm.email}
              onChange={handleContactFormChange}
              sx={{ mt: 2 }}
            />
            <TextField
              name="message"
              label="Your Message"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={contactForm.message}
              onChange={handleContactFormChange}
              sx={{ mt: 2 }}
            />
           <Button 
  type="submit" 
  variant="contained" 
  sx={{ backgroundColor: '#003366', mt: 2 }} 
  fullWidth
>
  Submit
</Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default Navbar;
