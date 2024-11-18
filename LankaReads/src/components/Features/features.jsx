import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Features.css";
import { FaShippingFast, FaShieldAlt, FaGem, FaRedoAlt } from 'react-icons/fa';

function Features() {
    return (
        <div className="container-fluid my-5 feature-background">
            <div className='row text-center'>
                <h2 className="feature-title">Our Best Features</h2>
            </div>
            <div className="row text-center mt-4">
                <div className="col-lg-3 col-md-6 mb-4">
                    <FaShippingFast size={40} className="feature-icon mb-3" />
                    <h4>Fast Delivery</h4>
                    <p>Our bookstore prioritizes speed and convenience. Enjoy fast and reliable shipping options with real-time tracking, so you can always stay informed about the status of your order.</p>
                </div>
                <div className="col-lg-3 col-md-6 mb-4">
                    <FaShieldAlt size={40} className="feature-icon mb-3" />
                    <h4>Safe Transactions</h4>
                    <p>.Your security is our top priority. We utilize advanced security measures to protect your personal information and ensure that your transactions are safe and secure.</p>
                </div>
                <div className="col-lg-3 col-md-6 mb-4">
                    <FaGem size={40} className="feature-icon mb-3" />
                    <h4>Premium Quality</h4>
                    <p>We are committed to providing you with the highest quality books. Our collection features carefully curated titles from reputable publishers, guaranteeing that you'll receive books in excellent condition.</p>
                </div>
                <div className="col-lg-3 col-md-6 mb-4">
                    <FaRedoAlt size={40} className="feature-icon mb-3" />
                    <h4>Easy Returns</h4>
                    <p> We understand that sometimes things don't work out. Our hassle-free returns policy allows you to easily exchange or return items, ensuring your complete satisfaction.</p>
                </div>
            </div>
        </div>
    );
}

export default Features;
