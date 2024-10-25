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
  color: 'black',
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

// Modal styles
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

// Navbar component
const Navbar = () => {
  const navigate = useNavigate();
  const { cart, addToCart } = useCart();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  // Debounce the search query
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
    addToCart(selectedProduct);
    handleCloseModal();
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
        <ListItem button onClick={() => setContactModalOpen(true)}>
          <ListItemText primary="Contact Us" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar position="static" sx={{ backgroundColor: '#e27604' }}>
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dopee
          </Typography>
        )}
        {!isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
            <Button color="inherit" onClick={() => setContactModalOpen(true)}>
              Contact Us
            </Button>
            <Button color="inherit" onClick={() => navigate('/')}>
              Home
            </Button>
            <Button color="inherit" onClick={() => navigate('/shop')}>
              Shop
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
                <Card onClick={() => handleProductClick(product)} sx={{ cursor: 'pointer' }}>
                  <CardMedia
                    component="img"
                    height="80"
                    sx={{ objectFit: 'contain', width: 'auto', margin: '0 auto' }}
                    image={product.images[0]}
                    alt={product.title}
                  />
                  <CardContent>
                    <Typography variant="h6">{product.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Price: ${product.price}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Modal for product details */}
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          {selectedProduct && (
            <>
              <Typography variant="h6" component="h2">{selectedProduct.title}</Typography>
              <CardMedia
                component="img"
                height="200"
                sx={{ objectFit: 'contain', width: '100%', margin: '0 auto' }}
                image={selectedProduct.images[0]}
                alt={selectedProduct.title}
              />
              <Typography variant="body2" color="textSecondary">Price: ${selectedProduct.price}</Typography>
              <Typography variant="body2" color="textSecondary">Discount: {selectedProduct.discountPercentage}%</Typography>
              <Typography variant="body2" color="textSecondary">Rating: {selectedProduct.rating}</Typography>
              <Typography variant="body2" color="textSecondary">Description: {selectedProduct.description}</Typography>
              <Button variant="contained" onClick={handleAddToCart}>Add to Cart</Button>
            </>
          )}
        </Box>
      </Modal>

      {/* Modal for contact form */}
      <Modal open={contactModalOpen} onClose={() => setContactModalOpen(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6">Contact Us</Typography>
          <form onSubmit={handleContactSubmit}>
            <TextField
              label="Name"
              name="name"
              value={contactForm.name}
              onChange={handleContactFormChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Email"
              name="email"
              value={contactForm.email}
              onChange={handleContactFormChange}
              type="email"
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Message"
              name="message"
              value={contactForm.message}
              onChange={handleContactFormChange}
              multiline
              rows={4}
              fullWidth
              required
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">Send</Button>
          </form>
        </Box>
      </Modal>
    </AppBar>
  );
};

export default Navbar;
