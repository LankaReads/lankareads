import React, { useEffect, useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../components/Header/Header';
import './OpenPage.css';
import ScrollTop from '../../components/Scroll-top/ScrollTop';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';
import { ThemeContext } from '../../contexts/ThemeContext';

function OpenPage() {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);
  const { isDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/books/${bookId}`);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
        setError('Failed to fetch book details.');
      }
    };

    fetchBookDetails();
  }, [bookId]);

  const handleAddToCart = () => {
    if (book) {
      addToCart(book);
    }
  };

  const handlePayNow = async () => {
    try {
        const amount = book.price * 100; // Convert to cents
        const response = await axios.post('http://localhost:5000/create-checkout-session', {
            amount,
            bookId,
            name: book.name,
            image: book.image,
            price: book.price,
            bookdoc: book.bookdoc,
            description: book.description,
        });
        const sessionUrl = response.data.url;
        window.location.href = sessionUrl;
    } catch (error) {
        console.error('Error during checkout:', error);
        alert('There was an issue with the checkout. Please try again later.');
    }
  };
  

  const handleCashOnDelivery = () => {
    navigate(`/delivery?bookId=${bookId}&name=${encodeURIComponent(book.name)}&price=${book.price}&image=${encodeURIComponent(book.image)}`);
  };

  return (
    <div className={`open-pages ${isDarkMode ? 'dark-mode' : ''}`}>
      <Header />
      <div className="container mt-5 mb-5">
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        {book ? (
          <div className="row book-details-card shadow-lg rounded border-0 p-4">
            {/* Book Image Column */}
            <div className="col-md-6 d-flex justify-content-center align-items-center">
              <img
                src={book.image}
                alt={`${book.name} Cover`}
                className="book-image img-fluid rounded"
                style={{ maxHeight: '400px', objectFit: 'cover' }}
              />
            </div>

            {/* Book Information Column */}
            <div className="col-md-6 d-flex flex-column justify-content-center">
              <p className="book-description">{book.description}</p>
              <br /><br />
              <h2 className="heading-secondary mb-3">{book.name}</h2>
              <p className="book-author">Author: {book.author}</p>
              <p className="book-price">Price: ${book.price.toFixed(2)}</p>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-primary flex-fill"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
                <button
                  className="btn btn-success flex-fill"
                  onClick={handlePayNow}
                >
                  Pay Now
                </button>
                <button
                  className="btn btn-secondary flex-fill"
                  onClick={handleCashOnDelivery}
                >
                  Cash on Delivery
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="alert alert-info" role="alert">Loading book details...</div>
        )}
      </div>
      
      <ScrollTop />
    </div>
  );
}

export default OpenPage;
