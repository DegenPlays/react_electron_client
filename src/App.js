import React, { useState } from 'react';
import { HashRouter as Router, Route, Routes, Navigate   } from 'react-router-dom';

import NavigationBar from './components/NavigationBar';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage'; // Import the new Login page
import Register from './pages/Register'; // Import the new Login page
import UsersPage from './pages/UsersPage'; // Import the new UsersPage
import { socket } from './components/socket';
// import { useNavigate } from 'react-router-dom';

const App = () => {
  const [user, setUser] = useState(null);
  // const navigate = useNavigate();

  const handleLogin = (user) => {
    // Assuming onLogin is a callback that sets the user state
    setUser(user);
    console.log('user:',user)
    // navigate("/"); // Redirect to the Settings page after successful login
  };

  const handleLogout = async () => {
    socket.emit('logout')
  };


  return (
    <Router>
      <NavigationBar user={user} onLogout={handleLogout}/>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<UsersPage />} />

        {/* Protected routes */}
        <Route
          path="/settings"
          element={user ? <SettingsPage /> : <Navigate to="/login" />}
        />

        {/* Login route */}
        <Route
          path="/login"
          element={<LoginPage onLogin={handleLogin} />}
        />
        
        <Route
          path="/register"
          element={<Register />}
        />
      </Routes>
    </Router>
  );
};

export default App;