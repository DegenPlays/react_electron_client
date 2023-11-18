//App.js
import React, { useState } from 'react';
import { HashRouter as Router, Route, Routes, Navigate   } from 'react-router-dom';
import { socket } from './components/socket';
import './App.css';

import NavigationBar from './components/NavigationBar';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage'; // Import the new Login page
import Register from './pages/Register'; // Import the new Login page
import UsersPage from './pages/UsersPage'; // Import the new UsersPage
import ChatPage from './pages/ChatPage'; // Import the new ChatPage component
import DisclaimerPage from './pages/DisclaimerPage'; // Import the new ChatPage component
import ProjectBidPage from './pages/ProjectBidPage'; // Import the new ChatPage component
import AccountPage from './pages/AccountPage'; // Import the new ChatPage component
import UserAutomations from './pages/UserAutomations'; // Import the new ChatPage component
import PrivateRoute from './components/PrivateRoute';
// import PrivateRoute from './components/PrivateRoute';
// import { useNavigate } from 'react-router-dom';

const App = () => {
  const [user, setUser] = useState(null);
  // const navigate = useNavigate();

  const handleLogin = (user) => {
    // Assuming onLogin is a callback that sets the user state
    setUser(user);
    console.log('app user:',user)
    // navigate("/"); // Redirect to the Settings page after successful login
  };

  const handleLogout = async () => {
    socket.emit('logout')
    setUser(null)
  };

  return (
    <Router>
      <NavigationBar user={user} onLogout={handleLogout}/>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage user={user}/>} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/disclaimer" element={<DisclaimerPage />} />

        {/* Protected routes */}
        <Route path="/settings" element={
          <PrivateRoute>
            <SettingsPage />
            {user}
          </PrivateRoute>
        } />
        <Route path="/chat" element={
          <PrivateRoute>
            <ChatPage user={user}  />
            {user}
          </PrivateRoute>
        } />
        <Route path="/projectBid" element={
          <PrivateRoute>
            <ProjectBidPage />
            {user}
          </PrivateRoute>
        } />
        <Route path="/account" element={
          <PrivateRoute>
            <AccountPage user={user}  />
            {user}
          </PrivateRoute>
        } />
        <Route path="/userAutomation" element={
          <PrivateRoute>
            <UserAutomations user={user}  />
            {user}
          </PrivateRoute>
        } />
        
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