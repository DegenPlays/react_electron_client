import logo from '../logo.svg';
import React, { useEffect, useState } from 'react';
import { socket } from '../components/socket';
import { useNavigate } from 'react-router-dom';
// import { runSeleniumTest } from '../automations/quopi';
const path = require("path");
// const childProcess = require('child_process');
// import runSeleniumTest from '../automations/quopi'


export default function HomePage({ user }) {
  const navigate = useNavigate();
  const version = '0.0.0.2'

  const handleLogin = () => {
    navigate("/login")
  }
  
  // const handleRunSeleniumTest = async () => {
  //   try {
      // await runSeleniumTest();
    //   const scriptPath = path.join(__dirname, '../automations', 'quopi.js'); // Adjust the path
  
    //   // Run the Selenium script as a child process
    //   const seleniumProcess = childProcess.spawn('node', [scriptPath]);
  
    //   // Handle script output
    //   seleniumProcess.stdout.on('data', (data) => {
    //     console.log(`Selenium Script Output: ${data}`);
    //   });
  
    //   seleniumProcess.stderr.on('data', (data) => {
    //     console.error(`Selenium Script Error: ${data}`);
    //   });
  
    //   seleniumProcess.on('close', (code) => {
    //     console.log(`Selenium Script exited with code ${code}`);
    //   });
  
    //   // await runSeleniumTest();
  //   } catch (error) {
  //     console.error('Selenium test failed:', error);
  //   }
  // };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
         Welcome to DegenPlays Automation
        </p>
        <a
          className="App-link"
          href="https://degenplays.club/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit our site for more detailed information
        </a>
        {!user ? (
          <button onClick={handleLogin}>Login</button>
          ):(
            <p>Welcome {user.username}</p>
          )
        }
        <p>Version: {version}</p>
        {/* <button onClick={handleRunSeleniumTest}>Quopi</button> */}
      </header>
    </div>
  );
}
