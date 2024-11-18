import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For redirection
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/footer";
import './Register.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoogleLoginButton, FacebookLoginButton } from "react-social-login-buttons";
import ScrollTop from '../../components/Scroll-top/ScrollTop';

function navigate(url){
    window.location.href = url
}

async function auth(){
    const response = await fetch('http://127.0.0.1:5000/request',{method:'post'});
    const data = await response.json();
    navigate(data.url);
}

function Register() {
    const [showLogin, setShowLogin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // NEW state to track login status
    const [userData, setUserData] = useState({}); // Store user data after login
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const navigate = useNavigate(); // Initialize useNavigate hook

    // Show login modal
    const handleLoginClick = () => setShowLogin(true);

    // Close login modal
    const handleCloseClick = () => setShowLogin(false);

    // Handle input changes for registration form
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({ ...prevState, [id]: value }));
    };

    // Handle registration form submission
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        try {
            await axios.post('http://localhost:5000/api/auth/register', formData);
            alert('Registration successful! Now Please Login to shop');
            setFormData({ name: '', email: '', password: '', confirmPassword: '' });
            setError('');  // Clear any previous error messages

            // navigate('/home');  // Change this to '/home' if you want to redirect to the home page

        } catch (err) {
            console.error(err);
            setError("Registration failed. Try again.");
        }
    };

    // Handle input changes for login form
    const handleLoginInputChange = (e) => {
        const { id, value } = e.target;
        setLoginData(prevState => ({ ...prevState, [id]: value }));
    };

    // Handle login form submission
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', loginData);
            alert("Login successful");

            const { token, user } = response.data;

        // Check if the logged-in user is the admin
        if (loginData.email === 'admin@gmail.com' && loginData.password === 'admin1234') {
            // Store the admin user data and token in local storage
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            // Redirect to the admin page
            navigate('/admindashboard');
        } else {
            // Store token and user data for non-admin users
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            // Update state with user data
            setIsLoggedIn(true);
            setUserData(user);
            setShowLogin(false); // Close the modal

            // Redirect to the home page for non-admin users
            navigate('/home');
        }
        } catch (err) {
            console.error(err);
            setError("Login failed. Check your credentials.");
        }
    };

    return (
        <div className={`register-page ${document.body.classList.contains('dark-mode') ? 'dark-mode' : ''}`}>
            <Header isLoggedIn={isLoggedIn} userData={userData} /> {/* Pass login status and user data to Header */}
            <div className="register-section">
                {!isLoggedIn ? (
                    <div className="container d-flex justify-content-center align-items-center min-vh-100">
                        <div className="row w-100">
                            <div className="col-lg-6 col-md-8 col-sm-12 mx-auto">
                                <h2 className="text-center mb-3">Register Here</h2>
                                {error && <div className="alert alert-danger">{error}</div>}
                                <form className="shadow p-3 mb-4 rounded" onSubmit={handleRegisterSubmit}>
                                    <div className="form-group mb-3">
                                        <label htmlFor="name" className="font-weight-bold">Name</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            id="name"
                                            placeholder="Enter your name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="email" className="font-weight-bold">Email address</label>
                                        <input
                                            type="email"
                                            className="form-control form-control-sm"
                                            id="email"
                                            placeholder="Enter your email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="password" className="font-weight-bold">Password</label>
                                        <input
                                            type="password"
                                            className="form-control form-control-sm"
                                            id="password"
                                            placeholder="Create a password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="confirmPassword" className="font-weight-bold">Confirm Password</label>
                                        <input
                                            type="password"
                                            className="form-control form-control-sm"
                                            id="confirmPassword"
                                            placeholder="Confirm your password"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-danger btn-block py-1">Register</button>
                                </form>
                                <div className="text-center">
                                    <p>or register with</p>
                                    <GoogleLoginButton
                                        onClick={() => auth()}
                                        style={{ width: '100%', marginBottom: '8px', transform: 'scale(0.9)' }}
                                    />
                                    {/* <FacebookLoginButton
                                        onClick={() => alert("Facebook login")}
                                        style={{ width: '60%', transform: 'scale(0.9)' }}
                                    /> */}
                                </div>
                                <div className="text-center mt-2">
                                    <p>Already have an account? <a href="#" onClick={handleLoginClick} style={{ color: '#f42d00' }}>Login here</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="container text-center">
                        <h2>Welcome back, {userData.name}!</h2>
                        <p>You are logged in as {userData.email}.</p>
                    </div>
                )}
            </div>

            {/* Login Modal */}
            {showLogin && !isLoggedIn && (
                <div className="modal show">
                    <div className="modal-dialog modal-dialog-centered modal-sm">
                        <div className="modal-content shadow-lg login-card">
                            <div className="modal-header">
                                <h5 className="modal-title" id="loginModalLabel">Login</h5>
                                <button type="button" className="close" onClick={handleCloseClick} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleLoginSubmit}>
                                    <div className="form-group mb-2">
                                        <label htmlFor="email" className="font-weight-bold">Email address</label>
                                        <input
                                            type="email"
                                            className="form-control form-control-sm"
                                            id="email"
                                            placeholder="Enter your email"
                                            value={loginData.email}
                                            onChange={handleLoginInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group mb-2">
                                        <label htmlFor="password" className="font-weight-bold">Password</label>
                                        <input
                                            type="password"
                                            className="form-control form-control-sm"
                                            id="password"
                                            placeholder="Enter your password"
                                            value={loginData.password}
                                            onChange={handleLoginInputChange}
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-danger btn-block mb-2">Login</button>
                                </form>
                                <div className="text-center">
                                    <GoogleLoginButton
                                        onClick={() => auth()}
                                        style={{ width: '100%', marginBottom: '8px', transform: 'scale(0.9)' }}
                                    />
                                    {/* <FacebookLoginButton
                                        onClick={() => alert("Facebook login")}
                                        style={{ width: '60%', transform: 'scale(0.9)' }}
                                    /> */}
                                </div>
                                <div className="text-center">
                                    <p>Don't have an account? <a href="#" onClick={handleCloseClick} style={{ color: '#f42d00' }}>Register here</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <ScrollTop />
            <Footer />
        </div>
    );
}

export default Register;
