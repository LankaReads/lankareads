import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage when the component mounts
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    
  }, [cart]);

  const addToCart = (book) => {
    setCart((prevCart) => [...prevCart, book]);
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  const removeFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const getCartCount = () => {
    return cart.length;
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getCartCount, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};
