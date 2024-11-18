import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import logo from "../../img/logo2.png";

function Footer() {
    return (
        <footer className="container-fluid text-center text-lg-start bg-black text-white">
            <section className="d-flex justify-content-center justify-content-lg-between p-3 border-bottom">
                <div className="me-6 d-none d-lg-block">
                    <span>Get connected with us on social networks:</span>
                </div>
                <div>
                    <a href="#" className="me-3 text-reset">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" className="me-3 text-reset">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#" className="me-3 text-reset">
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a href="#" className="me-3 text-reset">
                        <i className="fab fa-linkedin"></i>
                    </a>
                </div>
            </section>
            <section>
                <div className="container text-center text-md-start">
                    <div className="row mt-3">
                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-4">
                            <a href="#">
                                <img src={logo} className='logo2' alt="Lanka Reads" />
                            </a>
                            <p className='pp'>
                                Lanka Reads is the best and most popular online bookshop in Sri Lanka. It offers a wide range of digital books for avid readers.
                            </p>
                        </div>
                        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">Our Links</h6>
                            <p><a href="#!" className="text-reset">Home</a></p>
                            <p><a href="#!" className="text-reset">Shop</a></p>
                            <p><a href="#!" className="text-reset">Authors</a></p>
                            <p><a href="#!" className="text-reset">Register</a></p>
                        </div>
                        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">Resources</h6>
                            <p><a href="#!" className="text-reset">Download</a></p>
                            <p><a href="#!" className="text-reset">Help Center</a></p>
                            <p><a href="#!" className="text-reset">Shopping Cart</a></p>
                            <p><a href="#!" className="text-reset">Login</a></p>
                            <p><a href="#!" className="text-reset">Partner</a></p>
                        </div>
                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">Get in Touch</h6>
                            <p><i className="fas fa-home me-3"></i> Sri Lanka, Colombo, Homagama</p>
                            <p><i className="fas fa-phone me-3"></i> +01 234 567 88</p>
                            <p><i className="fas fa-envelope me-3"></i> example@gmail.com</p>
                        </div>
                    </div>
                </div>
            </section>
            <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                © 2024 Copyright:
                <a className="text-reset fw-bold" href="#">lankareads.lk</a>
            </div>
        </footer>
    );
}

export default Footer;
