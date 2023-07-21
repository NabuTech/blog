import React from "react";
import "../styles/Header.css";
import {Link} from 'react-router-dom';

const Header = () => {
    return (
        <header className="header">
         <Link to="/HomePage.js" className="logo">
          NabuTech
        </Link>
      </header>
    );
};

export default Header;

