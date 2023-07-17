import React from "react";
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="about-section">
                    <div className="logo-container">
                        <span class="logo" alt="logo">NabuTech</span>
                    </div>
                    <p> About Nabutech Section blah blah blah</p>
                </div>
                <div className="footer-links">
                    <p>&copy; 2023 NabuTech. All rights reserved.</p>
                    <p><a href="/policy">policy</a></p>
                </div>
                <div className="contact-section">
                    <h3>Get in Touch!</h3>
                    <p> Email: nabutech@proton.me</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;