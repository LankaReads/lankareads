import React, { useContext } from 'react';
import './BookContainer.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';

function BookContainer({ books, sectionTitle }) {
    const { addToCart } = useContext(CartContext);

    const renderBooksSection = (title, filteredBooks) => (
        <section className="backgrounds2 py-5">
            <div className="container text-center">
                <h2 className="mb-4">{title}</h2>
                <div className="row justify-content-center">
                    {filteredBooks.length > 0 ? (
                        filteredBooks.map((book, index) => (
                            <div key={index} className="col-lg-3 col-md-4 mb-4">
                                <div className="card h-100 text-dark">
                                    <Link to={`/OpenPage/${book._id}`}>
                                        <img 
                                            src={book.image} 
                                            className="card-img-top" 
                                            style={{ maxHeight: '230px', objectFit: 'cover' }} 
                                            alt={book.name} 
                                        />
                                    </Link>
                                    <div className="card-body d-flex flex-column justify-content-between">
                                        <h5 className="card-title">{book.name}</h5>
                                        <div className='d-flex flex-column justify-content-between align-items-center mt-3'>
                                            <b><p className="card-text mb-0">${book.price.toFixed(2)}</p></b>
                                            <div className="button-group d-flex mt-2">
                                                <Link to={`/OpenPage/${book._id}`} className="btn btn-secondary visit-btn me-2">
                                                    Visit
                                                </Link>
                                                <button 
                                                    className="btn btn-primary add-btn"
                                                    onClick={() => addToCart(book)}
                                                >
                                                    Add Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No {title.toLowerCase()} books available</p>
                    )}
                </div>
            </div>
        </section>
    );

    const fictionBooks = books.filter(book => book.category.toLowerCase() === 'fiction');
    const nonFictionBooks = books.filter(book => book.category.toLowerCase() === 'non-fiction');
    const scienceBooks = books.filter(book => book.category.toLowerCase() === 'science');

    return (
        <>
            {/* Dynamic Section */}
            {renderBooksSection(sectionTitle, books.slice(0, 6))}

            {/* Fiction Books Section */}
            {renderBooksSection('Fiction Books', fictionBooks)}

            {/* Non-Fiction Books Section */}
            {renderBooksSection('Non-Fiction Books', nonFictionBooks)}

            {/* Science Books Section */}
            {renderBooksSection('Science Books', scienceBooks)}
        </>
    );
}

export default BookContainer;
