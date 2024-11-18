import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer'; // Ensure this path is correct
import './Delivery.css';

const Delivery = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const [book, setBook] = useState({
    name: queryParams.get('name'),
    price: queryParams.get('price'),
    image: queryParams.get('image'),
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    agree: false,
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/single/delivery', {
        ...formData,
        bookName: book.name,
        bookPrice: book.price,
      });
      alert('Delivery details submitted successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        agree: false,
      });
    } catch (error) {
      console.error('Error submitting delivery details:', error);
      setError('Failed to submit delivery details.');
    }
  };

  return (
    <div>
      <Header />
      <div className="delivery-page container mt-5">
        <h1>Delivery Information</h1>
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        <div className="book-details">
          <img src={book.image} alt={`${book.name} Cover`} className="book-image img-fluid rounded" />
          <p><strong>Book Name:</strong> {book.name}</p>
          <p><strong>Price:</strong> ${book.price}</p>
        </div>
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
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Delivery;
