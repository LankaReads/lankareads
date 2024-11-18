import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import ScrollTop from '../../components/Scroll-top/ScrollTop';
import Footer from '../../components/Footer/footer';

function Blogs() {
    const [expandedPostId, setExpandedPostId] = useState(null);
    const [posts, setPosts] = useState([]);

    // Load blog posts from localStorage when the component mounts
    useEffect(() => {
        const storedPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
        setPosts(storedPosts);
    }, []);

    const handleReadMore = (id) => {
        setExpandedPostId(expandedPostId === id ? null : id);
    };

    return (
        <>
            <Header />
            <div className="jumbotron jumbotron-fluid text-white text-center" style={{ backgroundColor: '#f42d00', padding: '100px 0' }}>
                <div className="container">
                    <h1 className="display-4">Join Us Today!</h1>
                    <p className="lead">Become a part of our reading community.</p>
                </div>
            </div>
            <div className="container my-5">
                <h1 className="text-center mb-5" style={{ color: '#f42d00' }}>Our Blog</h1>
                <div className="row">
                    {posts && posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post.id} className="col-12 mb-4">
                                <div className="card h-100 shadow-sm">
                                    <img src={post.image} className="card-img-top" alt={post.title} />
                                    <div className="card-body">
                                        <h5 className="card-title">{post.title}</h5>
                                        <p className="card-text">
                                            {expandedPostId === post.id ? post.content : post.content.substring(0, 100) + '...'}
                                        </p>
                                        <p className="card-text">
                                            <small className="text-muted">By {post.author} on {post.date}</small>
                                        </p>
                                    </div>
                                    <div className="card-footer d-flex justify-content-between align-items-center">
                                        <button
                                            className="btn btn-outline-primary"
                                            style={{ borderColor: '#f42d00', color: '#f42d00' }}
                                            onClick={() => handleReadMore(post.id)}
                                        >
                                            {expandedPostId === post.id ? 'Show Less' : 'Read More'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center">No blog posts available.</p>
                    )}
                </div>
            </div>
            <ScrollTop />
            <Footer />
        </>
    );
}

export default Blogs;
