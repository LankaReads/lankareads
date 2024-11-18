import React, { useState, useEffect } from 'react';
import './ScrollTop.css'; 
import { FaChevronUp } from 'react-icons/fa';  // Import the new icon

const ScrollTop = () => {
    const [showScroll, setShowScroll] = useState(false);

    // Function to handle scroll event
    const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > 400) {
            setShowScroll(true);
        } else if (showScroll && window.pageYOffset <= 400) {
            setShowScroll(false);
        }
    };

    // Function to scroll to top
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Add event listener for scroll event
    useEffect(() => {
        window.addEventListener('scroll', checkScrollTop);
        return () => {
            window.removeEventListener('scroll', checkScrollTop);
        };
    }, [showScroll]);

    return (
        <div
            className={`scroll-top ${showScroll ? 'show' : ''}`}
            onClick={scrollToTop}
        >
            <FaChevronUp /> {/* Use the new icon here */}
        </div>
    );
};

export default ScrollTop;
