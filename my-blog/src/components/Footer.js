import React from "react";
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-sections">
                <div className="contact-section">
                        <h3>Get in Touch!</h3>
                        <div className="contact">
                            <div className="contact-links">
                                <a className="contact-link" href="mailto:nabutech@proton.me">nabutech@proton.me</a>
                            </div>
                            <div className="footer-icons">
                                <a className="icon" href="https://twitter.com/nabu_tech">
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a className="icon" href="https://www.linkedin.com/in/sammyjohnrawlinson/">
                                    <i className="fab fa-linkedin"></i>
                                </a>
                                <a className="icon" href="https://github.com/NabuTech">
                                    <i className="fab fa-github"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="about-section">
                        <div className="logo-container">
                            <span className="logo" alt="logo">NabuTech</span>
                        </div>
                        <h3>NabuTech: Crafting Exceptional Digital Experiences.We create
                             exceptional digital experiences. Whether you're an employer,
                              a tech enthusiast, or seeking software solutions, NabuTech 
                              is here to support you. Join us on this exciting tech 
                              adventure!</h3>
                    </div>
                </div>
                <div className="footer-links">
                    <p>&copy; 2023 NabuTech. All rights reserved.</p>
                    <p><a href="/policy">Policy</a></p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

