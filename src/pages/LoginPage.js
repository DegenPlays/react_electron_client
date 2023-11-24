// LoginPage.js
import React, { useState, useEffect } from 'react';
import { socket } from '../components/socket';
import { useNavigate } from 'react-router-dom';
import config from '../config';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    const handleLoginStatus = (data) => {
      if (data.status === 'success') {
        const user = data.user;
        console.log('login user', user);
        onLogin(user);
        navigate('/'); // Redirect to the Settings page after successful login
      }
    };

    socket.on('login_status', handleLoginStatus);

    // Cleanup the event listener when the component is unmounted
    return () => {
      socket.off('login_status', handleLoginStatus);
    };
  });

  const handleLogin = async () => {
    socket.emit('login', { username, password})
  };

  const handleRegister = () => {
    navigate("/register")
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="App">
    <header className="App-header">
      <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <br />
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <br />
          <button type="submit">Login</button>
          <br />
        </form>
        <button onClick={handleRegister}>Register</button>
      </div>
      </header>
    </div>
  );
};

export default LoginPage;
