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
        
        {user && (
          <>
            <li className="nav-item">
                <Link to="/userAutomation">Manage Automations</Link>
            </li>
            <li className="nav-item">
              <Link to="/chat">Chat</Link>
            </li>
            <li className="nav-item">
                <Link to="/settings">Settings</Link>
            </li>
            <li className="nav-item">
                <Link to="/projectBid">Project Bidding</Link>
            </li>
            <li className="nav-item">
                <Link to="/account">Account</Link>
            </li>
          </>
        )}
        {/* <li className="nav-item">
            <Link to="/register">Register</Link>
        </li> */}
        <li className="nav-item">
            <Link to="/users">Users</Link>
        </li>
        <li className="nav-item">
            <Link to="/disclaimer">Disclaimer</Link>
        </li>
        <li className="nav-item">
        <div>
        {user ? (
            <button onClick={onLogout}>Logout</button>
        ) : (
            <Link to="/login">Login</Link>
        )}
        </div>
        {/* Add more navigation links for additional pages */}
        </li>
      </ul>
    </nav>
  );
  
};



export default NavigationBar;