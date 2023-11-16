import logo from '../logo.svg';
import '../App.css';
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
      // Handle the response from the server, e.g., display a message to the user
    });

    // Cleanup the socket connection on component unmount
    return () => {
      // socket.disconnect();
    };
  }, []); // Empty dependency array means this effect runs once after the initial render

  // required_fields = ['unique_id', 'subscription_start_date', 'subscription_end_date', 'number_of_contracts']
  async function handleCreateAccount() {
    setAccountCreated('Waiting for server...')
    socket.emit('create_userEvent', {
      'username': username,
      'password':password,
      'wallet': wallet
    });
  }

    const handleUsernameChange = (e) => {
        // if(e.target.value ==''){
        //     return
        // }
        setUsername(e.target.value);
    };
    const handlePasswordChange = (e) => {
        // if(e.target.value ==''){
        //     return
        // }
        setPassword(e.target.value);
    };
    const handleWalletChange = (e) => {
        // if(e.target.value ==''){
        //     return
        // }
        setWallet(e.target.value);
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
        <input type="string" value={username} onChange={handleUsernameChange}/>
        <input type="password" value={password} onChange={handlePasswordChange}/>
        <input type="string" value={wallet} onChange={handleWalletChange}/>
        <button onClick={handleCreateAccount}>Create Account</button>
        <div>{accountCreated}</div>
      {/* Other JSX for your component */}
      </header>
    </div>
  );
}
