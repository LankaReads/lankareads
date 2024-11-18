import React, { useEffect, useState, useContext } from "react";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';
import './CardSlider.css';

const CardSlider = () => {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();
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

    const chunkSize = 4;
    const chunks = [];
    for (let i = 0; i < books.length; i += chunkSize) {
        chunks.push(books.slice(i, i + chunkSize));
    }

    const handleVisit = (bookId) => {
        navigate(`/openpage/${bookId}`);
    };

    const handleAddToCart = (book) => {
        addToCart(book);
        alert(`${book.name} has been added to the cart!`);
    };

    return (
        <div className="custom-card-slider-container">
            <Carousel>
                {chunks.map((chunk, chunkIndex) => (
                    <Carousel.Item key={chunkIndex} className="card-slider-item">
                        <div className="d-flex justify-content-center">
                            {chunk.length > 0 ? (
                                chunk.map((book, index) => (
                                    <Card key={index} className="custom-book-card">
                                        <Card.Img variant="top" src={book.image} className="custom-card-image" />
                                        <Card.Body className="custom-card-body">
                                            <div className="custom-card-title-row">
                                                <Card.Title className="custom-card-title"><h6>{book.name}</h6></Card.Title>
                                            </div>
                                            <div className="custom-card-details-row">
                                                <b className="custom-card-price">{book.price ? `$${book.price.toFixed(2)}` : "Price Not Available"}</b>
                                                <div className="custom-button-group">
                                                    <Button
                                                        className="custom-btn-visit"
                                                        onClick={() => handleVisit(book._id)}
                                                    >
                                                        Visit
                                                    </Button>
                                                    <Button
                                                        className="custom-btn-add-to-cart"
                                                        onClick={() => handleAddToCart(book)}
                                                    >
                                                        Add to Cart
                                                    </Button>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                ))
                            ) : (
                                <p>No books available</p>
                            )}
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
};

export default CardSlider;
