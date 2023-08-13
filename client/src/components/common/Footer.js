import React from 'react';
import '../../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} Car Maintenance Tracker. All rights reserved.</p>
            <p>Made with ❤️ by <a href="https://www.linkedin.com/in/fredrick-muikia/">Fredrick Muikia</a></p>
        </footer>
    );
};

export default Footer;
