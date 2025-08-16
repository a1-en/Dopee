// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './components/CartContext';
import { ThemeProvider } from './components/ThemeProvider';
import { Toaster } from './components/ui/sonner';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Page Components
import LandingPage from './components/LandingPage';
import Shop from './components/Shop';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Women from './components/Women';
import Mens from './components/Mens';
import WomenBags from './components/WomenBags';
import Shoes from './components/Shoes';
import SmartphoneList from './components/SmartphoneList';

const App = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="dopee-theme">
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-background">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/Women" element={<Women />} />
                <Route path="/Mens" element={<Mens />} />
                <Route path="/womenBags" element={<WomenBags />} />
                <Route path="/sneakers" element={<Shoes />} />
                <Route path="/smartphone" element={<SmartphoneList />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <Toaster />
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
};

export default App;
