import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';

const NavigationBar = ({ user, onLogout }) => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
            <Link to="/">Home</Link>
        </li>
        <li className="nav-item">
            <Link to="/settings">Settings</Link>
        </li>
        <li className="nav-item">
            <Link to="/register">Register</Link>
        </li>
        <div>
        {/* Other navigation items */}
        {user ? (
            <button onClick={onLogout}>Logout</button>
        ) : (
            <Link to="/login">Login</Link>
        )}
        </div>
        {/* Add more navigation links for additional pages */}
      </ul>
    </nav>
  );
  
};



export default NavigationBar;