import logo from '../logo.svg';
import React, { useEffect, useState } from 'react';
import { socket } from '../components/socket';


export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [wallet, setWallet] = useState('');
    const [accountCreated, setAccountCreated] = useState('');

  

  useEffect(() => {
    socket.on('create_userEvent-response', (data) => {
      console.log('Received create_userEvent response:', data);
      console.log('Received create_userEvent response:', data.message);
      if('message' in data){
        setAccountCreated(data['message']);
      }
      else if('error' in data){
        setAccountCreated(data['error']);
      }
    });

    return () => {
      socket.off('create_userEvent-response');
    };
  }, []); // Empty dependency array means this effect runs once after the initial render

  // required_fields = ['unique_id', 'subscription_start_date', 'subscription_end_date', 'number_of_contracts']
  function handleCreateAccount() {
    setAccountCreated('Waiting for server...')
    socket.emit('create_userEvent', {
      'username': username,
      'password':password,
      'wallet': wallet
    });
  }

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleWalletChange = (e) => {
        setWallet(e.target.value);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      handleCreateAccount();
    };
  
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <form onSubmit={handleSubmit}>
          <label>
            Username: 
          <input type="string" value={username} onChange={handleUsernameChange}/>
          </label>
          <br/>
          <label>
            Password: 
          <input type="password" value={password} onChange={handlePasswordChange}/>
          </label>
          <br/>
          <label>
            Wallet: 
          <input type="string" value={wallet} onChange={handleWalletChange}/>
          </label>
          <br/>
          <button type="submit">Create Account</button>
        </form>
        <div>{accountCreated}</div>
      </header>
    </div>
  );
}
