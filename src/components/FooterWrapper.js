// src/components/FooterWrapper.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import Footer from './Footer';

const FooterWrapper = () => {
  const location = useLocation();
  
  // Render Footer only if the current path is not "/cart"
  if (location.pathname === '/cart') {
    return null; // Don't render the footer in the Cart component
  }

  return <Footer />;
};

export default FooterWrapper;
