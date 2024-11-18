import React from 'react';
import './Whatsapp.css';

const Whatsapp = () => {
    // Function to handle WhatsApp chat link
    const handleWhatsAppClick = () => {
        const phoneNumber = '94704839011'; // Correctly formatted number without spaces or '+'
        const message = 'Hello, I would like to chat!'; // Default message
        const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappLink, '_blank'); // Open the link in a new tab
    };

    return (
        <button className="whatsapp-button" onClick={handleWhatsAppClick}>
            Chat with Us
        </button>
    );
};

export default Whatsapp;
