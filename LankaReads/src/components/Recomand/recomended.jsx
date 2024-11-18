import React, { useEffect, useState, useContext } from 'react';
import './recomended.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartContext } from '../../contexts/CartContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Recommended() {
  const [books, setBooks] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const handleAddToCart = (book) => {
    addToCart(book);
    alert(`${book.name} has been added to the cart!`);
  };

  return (
    <section className="recommend-section py-5">
      <div className="container text-center">
        <h2 className="recommend-title mb-4">Recommended For You</h2>
        <div className="row justify-content-center">
          {books.length > 0 ? (
            books.slice(0, 4).map((book, index) => (
              <div key={index} className="col-lg-3 col-md-6 mb-4">
                <div className="recommend-book-card h-100 d-flex flex-column justify-content-between">
                  <Link to={`/openpage/${book._id}`}>
                    <img 
                      src={book.image || 'https://via.placeholder.com/150'} 
                      className="recommend-book-img" 
                      alt={book.name || "Book Image"} 
                    />
                  </Link>
                  <div className="recommend-book-body mt-2">
                    <h5 className="recommend-book-title">{book.name || "No Title Available"}</h5>
                    <p className="recommend-book-price">${book.price ? book.price.toFixed(2) : "Price Not Available"}</p>
                    <div className="recommend-button-group d-flex flex-column align-items-center mt-2">
                      <Link to={`/openpage/${book._id}`}>
                        <button className="btn btn-secondary recommend-btn-visit mb-2">
                          Visit
                        </button>
                      </Link>
                      <button 
                        className="btn recommend-add-to-cart-btn" 
                        onClick={() => handleAddToCart(book)}
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No recommended books available</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Recommended;
