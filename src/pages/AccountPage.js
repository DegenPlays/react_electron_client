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
  const [aacusernameInput, setaacUsername] = useState('');
  const [aacpasswordInput, setaacPassword] = useState('');

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
      await appStore.addItemToStore({ quopi_login: {username: cipherUsername, password: cipherPassword} });
      console.log('Login Saved')
      const login = await appStore.fetchItem('quopi_login')
      console.log('login:',login)
      const store = await appStore.fetchStore()
      console.log('store:',store)
    }catch{
      console.log('Failed Saving Login')
    }
  };
  const handleaacUsernameChange = (e) => {
    setaacUsername(e.target.value);
  };
  const handleaacPasswordChange = (e) => {
      setaacPassword(e.target.value);
  };

  const handleaacSubmit = async (e) => {
    e.preventDefault();
    
    const cipherUsername = CryptoJS.AES.encrypt(aacusernameInput, encryptionKey).toString();
    const cipherPassword = CryptoJS.AES.encrypt(aacpasswordInput, encryptionKey).toString();
    
    try{
      await appStore.addItemToStore({ aac_login: {username: cipherUsername, password: cipherPassword} });
      console.log('Login Saved')
      const login = await appStore.fetchItem('quopi_login')
      console.log('login:',login)
    }catch{
      console.log('Failed Saving Login')
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
        <form onSubmit={handleaacSubmit}>
          <label>
            Username: 
          <input type="string" value={aacusernameInput} onChange={handleaacUsernameChange}/>
          </label>
          <br/>
          <label>
            Password: 
          <input type="password" value={aacpasswordInput} onChange={handleaacPasswordChange}/>
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
