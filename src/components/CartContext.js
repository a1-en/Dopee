// src/CartContext.js
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // Cart state and its setter

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]); // Function to add item to the cart
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, setCart }}> {/* Provide setCart */}
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
