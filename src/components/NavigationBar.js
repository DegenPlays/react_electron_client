import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';

const NavigationBar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
            <Link to="/">Home</Link>
        </li>
        <li className="nav-item">
            <Link to="/settings">Settings</Link>
        </li>
        {/* Add more navigation links for additional pages */}
      </ul>
    </nav>
  );
  
};



export default NavigationBar;