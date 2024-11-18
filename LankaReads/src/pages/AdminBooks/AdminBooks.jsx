import React, { useEffect, useState } from 'react';
import './AdminBooks.css';  // Custom CSS for specific styles
import AdminHeader from '../../components/AdminHeader/AdminHeader';

const AdminBooks = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    name: '',
    image: '',
    price: '',
    category: '',
    description: '',
    bookdoc: '', // Added bookdoc for PDF link
  });
  const [editingBook, setEditingBook] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  // Fetch all books from the API
  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/books');
      if (!response.ok) throw new Error('Failed to fetch books');
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      setError('Error fetching books');
      console.error('Error fetching books:', error);
    }
  };

  // Handle input changes for the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  // Create a new book and refresh the book list
  const createBook = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBook),
      });
      if (!response.ok) throw new Error('Error creating book');
      const createdBook = await response.json();
      setBooks([...books, createdBook]);
      setNewBook({ name: '', image: '', price: '', category: '', description: '', bookdoc: '' }); // Reset form
    } catch (error) {
      setError('Error creating book');
      console.error('Error creating book:', error);
    }
  };

  // Update book in the database
  const updateBook = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/books/${editingBook._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBook),
      });
      if (!response.ok) throw new Error('Error updating book');
      const updatedBook = await response.json();
      setBooks(books.map((book) => (book._id === updatedBook._id ? updatedBook : book)));
      setEditingBook(null);
      setNewBook({ name: '', image: '', price: '', category: '', description: '', bookdoc: '' });
    } catch (error) {
      setError('Error updating book');
      console.error('Error updating book:', error);
    }
  };

  // Delete book by ID
  const deleteBook = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/books/${id}`, { method: 'DELETE' });
      setBooks(books.filter((book) => book._id !== id));
    } catch (error) {
      setError('Error deleting book');
      console.error('Error deleting book:', error);
    }
  };

  // Prepare a book for editing
  const editBook = (book) => {
    setEditingBook(book);
    setNewBook({
      name: book.name,
      image: book.image,
      price: book.price,
      category: book.category,
      description: book.description,
      bookdoc: book.bookdoc, // Include bookdoc when editing
    });
  };

  return (
    <>
      <AdminHeader />
      <div className="admin-dashboard container">
        {/* Display error message */}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Form for creating/editing books */}
        <form className="form-book mb-5" onSubmit={editingBook ? updateBook : createBook}>
          <div className="row g-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Book Name"
                value={newBook.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                name="image"
                placeholder="Image URL"
                value={newBook.image}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="row g-3 mt-2">
            <div className="col-md-6">
              <input
                type="number"
                className="form-control"
                name="price"
                placeholder="Price"
                value={newBook.price}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                name="category"
                placeholder="Category" // Changed to a text input for typing categories
                value={newBook.category}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="row g-3 mt-2">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                name="bookdoc"
                placeholder="Book PDF URL" // Input for the bookdoc (PDF link)
                value={newBook.bookdoc}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-6">
              <textarea
                className="form-control"
                name="description"
                placeholder="Description"
                value={newBook.description}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
          </div>

          <button type="submit" className="btn btn-primary mt-3">
            {editingBook ? 'Update Book' : 'Add Book'}
          </button>
        </form>

        {/* Display all books */}
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Price</th>
                <th>Category</th>
                <th>PDF</th> {/* New column for the book PDF */}
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id}>
                  <td>{book.name}</td>
                  <td>
                    <img src={book.image} alt={book.name} className="book-img" />
                  </td>
                  <td>${book.price}</td>
                  <td>{book.category}</td>
                  <td>
                    <a href={book.bookdoc} target="_blank" rel="noopener noreferrer">
                      View PDF
                    </a>
                  </td> {/* Link to book PDF */}
                  <td>{book.description}</td>
                  <td>
                    <button className="btn btn-primary me-2" onClick={() => editBook(book)}>
                      Edit
                    </button>
                    <button className="btn btn-danger" onClick={() => deleteBook(book._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminBooks;
