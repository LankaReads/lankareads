import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './BookDoc.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/footer';  // Ensure import path is correct

const BookDoc = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  // Extract details from URL query parameters
  const bookId = queryParams.get('bookId');
  const name = queryParams.get('name');
  const price = queryParams.get('price');
  const image = queryParams.get('image');
  const initialBookDoc = queryParams.get('bookdoc'); // Initial value from URL params
  const [bookDocUrl, setBookDocUrl] = useState(initialBookDoc); // Set initial state from URL params

  useEffect(() => {
    const fetchBookDocUrl = async () => {
      try {
        const response = await fetch(`/api/books/${bookId}`); // Ensure /api prefix is correct
        
        if (!response.ok) {
          throw new Error('Failed to fetch book document.');
        }

        const data = await response.json(); // Parse JSON response

        if (data && data.bookdoc) {
          setBookDocUrl(data.bookdoc);
        } else {
          console.error('No bookdoc URL found in response.');
        }
      } catch (error) {
        console.error('Error fetching book document:', error);
      }
    };

    if (bookId) {
      fetchBookDocUrl();
    }
  }, [bookId]);

  // Function to handle downloading the bill (or info)
  const handleDownloadInfo = () => {
    const billContent = `
      Book Name: ${name}
      Price: $${price}
      Image URL: ${image}
      Book URL: ${initialBookDoc} // URL from initial params
    `;
    const blob = new Blob([billContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bill.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <Header />
      <div className="bill-page">
        <h1>Book Document Details</h1>
        <div className="bill-content">
          {image && <img src={image} alt={name} className="bill-image" />}
          <p><strong>Book Name:</strong> {name}</p>
          <p><strong>Price:</strong> ${price}</p>
          <button className="btn btn-primary downpdfbtn" onClick={handleDownloadInfo}>
            Download Info
          </button>
          {bookDocUrl ? (
            <button
              className="btn btn-success downpdfbtn"
              onClick={() => {
                const a = document.createElement('a');
                a.href = bookDocUrl;
                a.download = `${name}_document.pdf`;
                window.open(bookDocUrl, '_blank');
              }}
            >
              Download Book PDF
            </button>
          ) : (
            <p>Loading book document...</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookDoc;
