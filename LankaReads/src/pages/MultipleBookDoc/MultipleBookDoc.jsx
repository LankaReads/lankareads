import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/footer';
import './MultipleBookDoc.css';  // Custom style
import ScrollTop from '../../components/Scroll-top/ScrollTop';

function MultipleBookDoc() {
  const location = useLocation();
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Fetch cart and total price from URL query parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    
    const totalPrice = queryParams.get('totalPrice');

    // Parse and decode the cart data and total price

    
    if (totalPrice) {
      setTotalPrice(parseFloat(totalPrice));
      setCart(JSON.parse(localStorage.getItem("cart")));
    }
  }, [location]);

  // Function to generate and download a unique .txt file
  const handleDownloadInfo = (book) => {
    const content = `Book Name: ${book.name}\nPrice: $${book.price.toFixed(2)}\nThank you for your purchase!`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${book.name}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to download the book document (PDF or any other type of file)
  const handleDownloadDoc = (bookdoc, name) => {
    const link = document.createElement('a');
    link.href = bookdoc;
    link.target="_blank"
    link.download = `${name}_document.pdf`; // Adjust the file extension if needed
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="multiple-book-doc">
      <Header />
      <div className="container mt-5 mb-5">
        <h2 className="mb-3">Download Your Purchased Books</h2>
        {cart.length > 0 ? (
          <div className="row">
            {cart.map((book, index) => (
              <div key={index} className="col-md-3 mb-4"> {/* 4 books per row */}
                <div className="card p-3 shadow-sm">
                  <img src={book.image} alt={book.name} className="book-image mb-3" style={{ maxHeight: '150px', objectFit: 'cover' }} />
                  <h5>{book.name}</h5>
                  <p className="text-muted">Price: ${book.price.toFixed(2)}</p>
                  
                  <div className="d-flex justify-content-between">
                    {/* Download info button */}
                    <button className="btn btn-primary me-2" onClick={() => handleDownloadInfo(book)}>Download Info</button>

                    {/* Download book document */}
                    {book.bookdoc && (
                      <button className="btn btn-success" onClick={() => handleDownloadDoc(book.bookdoc, book.name)}>Download Book</button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div className="col-12">
              <h4>Total Price Paid: ${totalPrice.toFixed(2)}</h4>
            </div>
          </div>
        ) : (
          <div className="alert alert-info">No books found.</div>
        )}
      </div>
      <Footer />
      <ScrollTop />
    </div>
  );
}

export default MultipleBookDoc;
