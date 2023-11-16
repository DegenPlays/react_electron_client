// LoginPage.js
import React, { useState, useEffect } from 'react';
import { socket } from '../components/socket';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    socket.on('login_status', (data) => {
      if(data['status'] == 'success'){
        const user = data['user']
        console.log(user)
        onLogin(user);
        navigate("/"); // Redirect to the Settings page after successful login
      }
    })
  });

  const handleLogin = async () => {
    socket.emit('login', { username, password })//, (user) => {
      // Assuming the server sends the user object upon successful login
    //   console.log(user)
    //   onLogin(user);
    // });
  };

  return (
    <div>
      <h2>Login</h2>
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
      <button onClick={handleLogin}>Login</button>
      <br />
      <button onClick={navigate("/register")}>Register</button>
    </div>
  );
};

export default LoginPage;
