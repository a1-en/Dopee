import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { 
  Menu, 
  Search, 
  ShoppingCart, 
  X, 
  Heart,
  User,
  Phone,
  Mail,
  MapPin,
  Star,
  Plus,
  Minus
} from 'lucide-react';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

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
    }
  }, [debouncedSearchQuery]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setProductModalOpen(true);
  };

const handleAddToCart = () => {
    if (selectedProduct) {
    setCart([...cart, selectedProduct]);
    setSearchQuery('');
      setProductModalOpen(false);
      setNotification({
        show: true,
        message: 'Added to Cart Successfully!',
        type: 'success'
      });
      setTimeout(() => setNotification({ show: false, message: '', type: 'success' }), 3000);
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    console.log('Contact Form Submitted:', contactForm);
    setContactForm({ name: '', email: '', message: '' });
    setContactModalOpen(false);
    setNotification({
      show: true,
      message: 'Message sent successfully!',
      type: 'success'
    });
    setTimeout(() => setNotification({ show: false, message: '', type: 'success' }), 3000);
  };

  const updateCartItemQuantity = (productId, change) => {
    setCart(prevCart => {
      const newCart = [...prevCart];
      const itemIndex = newCart.findIndex(item => item.id === productId);
      
      if (itemIndex !== -1) {
        if (change === -1 && newCart[itemIndex].quantity <= 1) {
          newCart.splice(itemIndex, 1);
        } else {
          newCart[itemIndex].quantity = (newCart[itemIndex].quantity || 1) + change;
        }
      }
      
      return newCart;
    });
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + (item.quantity || 1), 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-purple-900 to-slate-900 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>support@dopee.com</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span>Free shipping on orders over $100</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Dopee
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
           <Button 
                variant="ghost" 
                className="text-gray-700 hover:text-purple-600 hover:bg-purple-50 font-medium"
                onClick={() => navigate('/')}
              >
             Home
           </Button>
           <Button 
                variant="ghost" 
                className="text-gray-700 hover:text-purple-600 hover:bg-purple-50 font-medium"
                onClick={() => navigate('/shop')}
              >
             Shop
           </Button>
           <Button 
                variant="ghost" 
                className="text-gray-700 hover:text-purple-600 hover:bg-purple-50 font-medium"
                onClick={() => navigate('/Women')}
              >
             Women
           </Button>
           <Button 
                variant="ghost" 
                className="text-gray-700 hover:text-purple-600 hover:bg-purple-50 font-medium"
                onClick={() => navigate('/Mens')}
              >
                Men
              </Button>
              <Button 
                variant="ghost" 
                className="text-gray-700 hover:text-purple-600 hover:bg-purple-50 font-medium"
                onClick={() => setContactModalOpen(true)}
              >
                Contact
           </Button>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search products..."
              value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
              />
              
              {/* Search Results Dropdown */}
        {searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
              {searchResults.map((product) => (
                    <div
                      key={product.id}
                      className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => handleProductClick(product)}
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={product.thumbnail}
                      alt={product.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{product.title}</h4>
                          <p className="text-sm text-gray-600">{product.description.slice(0, 60)}...</p>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">({product.rating})</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-purple-600">${product.price}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="w-5 h-5 text-gray-600" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative"
                onClick={() => navigate('/cart')}
              >
                <ShoppingCart className="w-5 h-5 text-gray-600" />
                {cart.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>

              <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileMenuOpen(true)}>
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold">Menu</h2>
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="p-6 space-y-4">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-lg"
                onClick={() => { navigate('/'); setMobileMenuOpen(false); }}
              >
                Home
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-lg"
                onClick={() => { navigate('/shop'); setMobileMenuOpen(false); }}
              >
                Shop
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-lg"
                onClick={() => { navigate('/Women'); setMobileMenuOpen(false); }}
              >
                Women
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-lg"
                onClick={() => { navigate('/Mens'); setMobileMenuOpen(false); }}
              >
                Men
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-lg"
                onClick={() => { setContactModalOpen(true); setMobileMenuOpen(false); }}
              >
                Contact
              </Button>
            </div>

            {/* Mobile Search */}
            <div className="p-6 border-t">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product Modal */}
      {productModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setProductModalOpen(false)} />
          <Card className="relative w-full max-w-md bg-white">
            <CardHeader className="text-center">
              <CardTitle>{selectedProduct.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <img
                src={selectedProduct.thumbnail}
      alt={selectedProduct.title} 
                className="w-full h-48 object-cover rounded-lg"
              />
              <p className="text-gray-600">{selectedProduct.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-purple-600">${selectedProduct.price}</span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(selectedProduct.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                  <span className="text-sm text-gray-500 ml-2">({selectedProduct.rating})</span>
                </div>
              </div>
              <Button 
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Contact Modal */}
      {contactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setContactModalOpen(false)} />
          <Card className="relative w-full max-w-md bg-white">
            <CardHeader>
              <CardTitle className="text-center">Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
              name="name"
              value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
              name="email"
                    type="email"
              value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <textarea
                    id="message"
              name="message"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              rows={4}
                    required
            />
                </div>
           <Button 
  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
>
                  Send Message
</Button>
          </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
          notification.type === 'success' 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
        }`}>
          {notification.message}
        </div>
      )}
    </>
  );
};

export default Navbar;
