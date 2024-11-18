import React, { useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/footer';
import './OpenCartSelection.css';
import ScrollTop from '../../components/Scroll-top/ScrollTop';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';
import { ThemeContext } from '../../contexts/ThemeContext';
import axios from 'axios';

function OpenCartSelection() {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { isDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const savedTotalPrice = parseFloat(localStorage.getItem('totalPrice')) || 0;
    setCart(savedCart);
    setTotalPrice(savedTotalPrice);
  }, []);

  const handleCashOnDelivery = () => {
    navigate(`/MultipleDelivery?totalPrice=${totalPrice}`);
  };

  const handleStripeCheckout = async () => {
    try {
      const response = await axios.post('http://localhost:5000/create-cart-checkout-session', {
        cart:JSON.parse(localStorage.getItem('cart')),
        totalPrice,
      });
      const sessionUrl = response.data.url;
      window.location.href = sessionUrl;
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('There was an issue with the checkout. Please try again later.');
    }
  };

  const handleViewBook = (bookId) => {
    navigate(`/openpage/${bookId}`);
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
                      ${book.price.toFixed(2)} x {book.quantity || 1}
                    </div>
                  </div>
                  {/* Add the View button */}
                  <button 
                    className="btn btn-info ms-3" 
                    onClick={() => handleViewBook(book._id)}
                  >
                    View
                  </button>
                </div>
              ))}
              <div>
                <strong className="total-price">Total Price: ${totalPrice.toFixed(2)}</strong>
              </div>
              <div className="d-flex gap-2 mt-3">
                <button className="btn btn-primary flex-fill" onClick={handleStripeCheckout}>
                  Checkout
                </button>
                <button className="btn btn-secondary flex-fill" onClick={handleCashOnDelivery}>
                  Cash on Delivery
                </button>
              </div>
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

export default OpenCartSelection;
