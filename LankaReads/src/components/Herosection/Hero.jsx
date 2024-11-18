import React, { useState, useEffect } from 'react';
import './Hero.css';
import image1 from '../../img/Kutse.jpg';
import image3 from '../../img/wallpaper2.webp';
import image4 from '../../img/wallpaper1.jpg';
import CardSlider from '../CardSlider/CardSlider';
import { useNavigate } from 'react-router-dom'; // useNavigate for navigation in react-router-dom v6

const images = [
  image1,
  image3,
  image4
];

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [showAuthorModal, setShowAuthorModal] = useState(false);
  const navigate = useNavigate(); // useNavigate hook

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleReaderClick = () => {
    navigate('/register'); // Navigate to the register page
  };

  const handleAuthorClick = () => {
    setShowAuthorModal(true);
  };

  const handleModalConfirm = () => {
    setShowAuthorModal(false);
    navigate('/contact'); // Navigate to the contact page
  };

  return (
    <div className="hero-container">
      <img src={images[currentImage]} alt="Hero" className="hero-image" />
      <div className="hero-overlay">
        <p className='welcome'>Welcome to...</p>
        <p className='lanka'>Lanka Reads</p>
        <div className='hero-buttons-container'>
          <button className="reader-btn" onClick={handleReaderClick}>Be a Reader</button>
          <button className="author-btn" onClick={handleAuthorClick}>Be an Author</button>
        </div>
        <p className='description'>
          Lanka Reads is the best and most popular online bookshop in Sri Lanka. It offers a wide range of digital books for avid readers.
        </p>
        <div className='card-slider-container'>
          <CardSlider />
        </div>
      </div>

      {showAuthorModal && (
        <div className="author-modal">
          <div className="modal-content">
            <p>Do you want to become an author?</p>
            <button className="btn btn-success" onClick={handleModalConfirm}>Yes</button>
            <button className="btn btn-danger" onClick={() => setShowAuthorModal(false)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
