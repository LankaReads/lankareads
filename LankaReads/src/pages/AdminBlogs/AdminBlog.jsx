import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AdminHeader from '../../components/AdminHeader/AdminHeader';
import ScrollTop from '../../components/Scroll-top/ScrollTop';
import Footer from '../../components/Footer/footer';

function AdminBlog() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [author, setAuthor] = useState('');
    const [posts, setPosts] = useState([]);

    // Load blog posts from localStorage when the component mounts
    useEffect(() => {
        const storedPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
        setPosts(storedPosts);
    }, []);

    // Handle form submission to add a new post
    const handleFormSubmit = (e) => {
        e.preventDefault();

        // Create a new post object with a unique ID
        const newPost = {
            id: uuidv4(),
            title,
            content,
            image,
            author,
            date: new Date().toLocaleDateString(),
        };

        const updatedPosts = [...posts, newPost];
        setPosts(updatedPosts);

        // Save the updated posts to localStorage
        localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));

        // Clear form fields
        setTitle('');
        setContent('');
        setImage('');
        setAuthor('');
    };

    // Handle deleting a post
    const handleDelete = (id) => {
        const updatedPosts = posts.filter(post => post.id !== id);
        setPosts(updatedPosts);
        localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
    };

    return (
        <>
            <AdminHeader />
            <div className="container my-5">
                <h1 className="text-center mb-5" style={{ color: '#f42d00' }}>Admin Blog Management</h1>

                {/* Form to create a new blog post */}
                <form onSubmit={handleFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Content</label>
                        <textarea
                            className="form-control"
                            id="content"
                            rows="5"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Image URL</label>
                        <input
                            type="text"
                            className="form-control"
                            id="image"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="author">Author</label>
                        <input
                            type="text"
                            className="form-control"
                            id="author"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#f42d00', borderColor: '#f42d00' }}>
                        Add Blog Post
                    </button>
                </form>

                {/* Display added blog posts */}
                <div className="row mt-5">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post.id} className="col-12 mb-4">
                                <div className="card h-100 shadow-sm">
                                    <img src={post.image} className="card-img-top" alt={post.title} />
                                    <div className="card-body">
                                        <h5 className="card-title">{post.title}</h5>
                                        <p className="card-text">{post.content}</p>
                                        <p className="card-text">
                                            <small className="text-muted">By {post.author} on {post.date}</small>
                                        </p>
                                        <button className="btn btn-danger" onClick={() => handleDelete(post.id)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center">No blog posts available. Add some!</p>
                    )}
                </div>
            </div>
            <ScrollTop />
            
        </>
    );
}

export default AdminBlog;
