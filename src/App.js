// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SmartphoneList from './components/SmartphoneList';
import WomenBags from './components/WomenBags';
import Shoes from './components/Shoes';
import Navbar from './components/Navbar';
import Shop from './components/Shop';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import { CartProvider } from './components/CartContext';
import FooterWrapper from './components/FooterWrapper';
import Mens from './components/Mens';
import Women from './components/Women';

const App = () => {
  const [cart, setCart] = useState([]);
  
  // Add global styles using useEffect
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      body {
        margin: 0;
        padding-bottom: 80px; /* Adjust this value based on your footer height */
      }
      #root {
        display: flex;
        flex-direction: column;
        min-height: 100vh; /* Ensure the root can expand to full height */
      }
      main {
        flex: 1; /* Make the main content fill available space */
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style); // Clean up on unmount
    };
  }, []);

  return (
    <CartProvider value={{ cart, setCart }}>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/smartphone" element={<SmartphoneList />} />
            <Route path="/womenBags" element={<WomenBags />} />
            <Route path="/sneakers" element={<Shoes />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/Mens" element={<Mens />} />
            <Route path="/Women" element={<Women />} />


          </Routes>
        </main>
        {/* Use FooterWrapper to conditionally render Footer */}
        <FooterWrapper />
      </Router>
    </CartProvider>
  );
};

export default App;
