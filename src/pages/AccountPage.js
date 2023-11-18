// AccountPage.js
import React, { useEffect, useState } from 'react';
import { socket } from '../components/socket';
import CryptoJS from 'crypto-js';
import config from '../config';
import appStore from '../components/store';
// import fs from 'fs-extra'; // Import fs-extra instead of fs
const path = require("path");
// const fs = require('fs');

const encryptionKey = config.REACT_APP_ENCRYPTION_KEY;

const AccountPage = ({user}) => {
  const [usernameInput, setUsername] = useState('');
  const [passwordInput, setPassword] = useState('');

  const handleUsernameChange = (e) => {
      setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
      setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const cipherUsername = CryptoJS.AES.encrypt(usernameInput, encryptionKey).toString();
    const cipherPassword = CryptoJS.AES.encrypt(passwordInput, encryptionKey).toString();
    
    try{
      await appStore.addItemToStore({ quopi: {username: cipherUsername, password: cipherPassword} });
    }catch{
      console.log('Saving Login failed')
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Account Details</h2>
      </header>
      <div className="App-body">
        <p>Username: {user.username}</p>
        <p>Wallet: {user.wallet}</p>
        <p>Email: {user.email? user.email : 'Not Set'}</p>
        <p>Subscription Status: {user.subscription_status}</p>
        {user.subscription_status =='Active' &&
          <>
            <p>Subscription: {user.subscription}</p>
            <table className="project-table">
                <thead>
                    <tr>
                    <th>Project Id</th>
                    <th>Project Name</th>
                    <th>Project Type</th>
                    <th>Current Bid</th>
                    {/* Add more columns as needed */}
                    </tr>
                </thead>
                <tbody>
                    {user.active_projects.map(project => (
                    <tr key={project.id}>
                        <td>{project.id}</td>
                        <td>{project.project}</td>
                        {/* <td>{project.type}</td>
                        <td>{project.current_bid}</td> */}
                        {/* Add more columns as needed */}
                    </tr>
                    ))}
                </tbody>
            </table>
          </>
        }
        <h3>Quopi account info</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Username: 
          <input type="string" value={usernameInput} onChange={handleUsernameChange}/>
          </label>
          <br/>
          <label>
            Password: 
          <input type="password" value={passwordInput} onChange={handlePasswordChange}/>
          </label>
          <br/>
          <br />
          <button type="submit">Save</button>
          <br />
        </form>
        </div>
    </div>
  );
};

export default AccountPage;
