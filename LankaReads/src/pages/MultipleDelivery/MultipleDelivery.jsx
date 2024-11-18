// src/pages/MultipleDelivery/MultipleDelivery.js

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/footer';
import ScrollTop from '../../components/Scroll-top/ScrollTop';
import { ThemeContext } from '../../contexts/ThemeContext';
import './MultipleDelivery.css';

function MultipleDelivery() {
  const { isDarkMode } = useContext(ThemeContext);
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    agree: false,
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const savedTotalPrice = parseFloat(localStorage.getItem('totalPrice')) || 0;
    setCart(savedCart);
    setTotalPrice(savedTotalPrice);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const deliveryDetails = {
      ...formData,
      cartItems: cart.map(item => ({
        name: item.name, // Include book name
        price: item.price, // Include book price
      })),
      totalPrice: totalPrice,
    };
    

    try {
      console.log('Submitting with data:', deliveryDetails);
      await axios.post('http://localhost:5000/api/delivery', deliveryDetails);
      setSuccess('Delivery details submitted successfully!');
    } catch (error) {
      console.error('Error submitting delivery details:', error.response ? error.response.data : error.message);
      setError('Error submitting delivery details. Please try again.');
    }
  };

  return (
    <div className={`open-pages ${isDarkMode ? 'dark-mode' : ''}`}>
      <Header />
      <div className="container mt-5 mb-5">
        {cart.length > 0 ? (
          <div className="row book-details-card shadow-lg rounded border-0 p-4">
            <div className="col-md-12 d-flex flex-column">
              <h2 className="heading-secondary mb-3">Your Cart</h2>
              {cart.map((book, index) => (
                <div key={index} className="d-flex justify-content-between align-items-center mb-3 p-2 shadow-sm">
                  <img src={book.image} alt={book.name} className="book-image me-3" style={{ maxHeight: '100px', objectFit: 'cover' }} />
                  <div className="cart-item-details">
                    <span>{book.name}</span>
                    <div className={`text-muted price-quantity`}>
                      ${book.price.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
              <div>
                <strong className="total-price">Total Price: ${totalPrice.toFixed(2)}</strong>
              </div>

              {/* Delivery Form */}
              <form onSubmit={handleSubmit} className="delivery-form mt-4">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Delivery Address</label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="form-control"
                    rows="3"
                    required
                  ></textarea>
                </div>
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    id="agree"
                    name="agree"
                    checked={formData.agree}
                    onChange={handleChange}
                    className="form-check-input"
                    required
                  />
                  <label htmlFor="agree" className="form-check-label">I agree to the terms and conditions</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                {error && <div className="alert alert-danger mt-3">{error}</div>}
                {success && <div className="alert alert-success mt-3">{success}</div>}
              </form>
            </div>
          </div>
        ) : (
          <div className="alert alert-info" role="alert">Your cart is empty.</div>
        )}
      </div>
      <Footer />
      <ScrollTop />
    </div>
  );
}

export default MultipleDelivery;
