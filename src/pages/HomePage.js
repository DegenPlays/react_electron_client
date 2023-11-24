import logo from '../logo.svg';
import React, { useEffect, useState } from 'react';
import { socket } from '../components/socket';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import appStore from '../components/store';
import CryptoJS from 'crypto-js';
const { ipcRenderer } = require('electron')
// import { runSeleniumTest } from '../automations/quopi';
const path = require("path");
const childProcess = require('child_process');
// import runSeleniumTest from '../automations/quopi'

const encryptionKey = config.REACT_APP_ENCRYPTION_KEY;
const env = config.REACT_APP_ENVIRONMENT;
const extras = path.join(process.resourcesPath, '..')
const scriptLoc = path.join(process.resourcesPath,'../node_modules')

function getExtraFilesPath ()  {
  return path.join(process.resourcesPath, '..')
}

export default function HomePage({ user }) {
  const [error, setError] = useState(false);
  const [isHeadless, setIsHeadless] = useState(true);
  const navigate = useNavigate();
  const version = '0.0.3'
  
  useEffect(() => {
    async function fetchData() {
      const qlogin = await appStore.fetchItem('quopi_login')
      const alogin = await appStore.fetchItem('aac_login')
    }
    fetchData();
  }, []);

  const handleLogin = () => {
    navigate("/login")
  }
  
  const handleRegister = () => {
    navigate("/register")
  }
  
  const handleRunQuopi = async () => {
    const login = await appStore.fetchItem('quopi_login')

    const username = CryptoJS.AES.decrypt(login['username'], encryptionKey).toString(CryptoJS.enc.Utf8);
    const password = CryptoJS.AES.decrypt(login['password'], encryptionKey).toString(CryptoJS.enc.Utf8);
    try {
      console.log('__dirname:', __dirname);
      const extras = path.join(process.resourcesPath, '..')
      let scriptPath = path.join(extras, 'automations', 'quopi.js'); // Adjust the pa
      if(env == 'test'){
        console.log('test Quopi')
        scriptPath = path.join(__dirname, '../src/automations', 'quopi.js'); // Adjust the path
      }
      
      console.log('Current directory:', __dirname);
      console.log('chrome dirver:', path.join(process.resourcesPath, 'chromedriver'));
      console.log('chrome dirver ../../:', path.join(process.resourcesPath,'app.asar.unpacked/node_modules', 'chromedriver'));
      console.log('resourcesPath:', process.resourcesPath);
      console.log('Selenium module path:', path.join(__dirname, 'node_modules', 'selenium-webdriver'));
      console.log('Chromedriver module path:', path.join(__dirname, 'node_modules', 'chromedriver'));
      alert('About to run quopi')
      const seleniumProcess = childProcess.spawn('node', [scriptPath, username, password, encryptionKey,scriptLoc]);
      
      
      // Send a message to the main process to show an info dialog
      ipcRenderer.send('show-message-box', {
        type: 'info',
        title: 'Quopi Script',
        message: 'Quopi script is running...',
      });
      
      // const nodePath = path.join(process.resourcesPath, 'node.exe'); // Adjust the file extension if needed
      // console.log('nodePath:', nodePath);
      // const seleniumProcess = childProcess.spawn(nodePath, [scriptPath, username, password]);
      // seleniumProcess.on('error', (err) => {
      //   console.error('Error executing child process:', err);
      // });
      // console.log('__dirname:', __dirname);
      // Run the Selenium script as a child process
      // const seleniumProcess = childProcess.spawn('node', [scriptPath, username, password], {cwd: __dirname,});
  
      // Handle script output
      seleniumProcess.stdout.on('data', (data) => {
        console.log(`Selenium Script Output: ${data}`);
      });
  
      seleniumProcess.stderr.on('data', (data) => {
        console.error(`Selenium Script Error: ${data}`);
        ipcRenderer.send('show-message-box', {
          type: 'error',
          title: 'Script Error',
          message: data.toString(),
        });
        setError(true)
      //   dialog.showMessageBox({
      // // dialog.showMessageBox(null,{
      //     message: `Script Error:  ${data}`
      //   })
      });
  
      seleniumProcess.on('close', (code) => {
        console.log(`Selenium Script exited with code ${code}`);
        if(error){
          ipcRenderer.send('show-message-box',{
            type: 'info',
            title: 'Quopi Script',
            message: 'Quopi script failed to complete.',
          });
        }
        else{
          ipcRenderer.send('show-message-box',{
            type: 'info',
            title: 'Quopi Script',
            message: 'Quopi script completed.',
          });
        }
        setError(false)
        // dialog.showMessageBox(mainWindow, {
      // dialog.showMessageBox(null,{
      //     message: `Script Completed`
      //   })
      });
  
      // await runSeleniumTest();
    } catch (error) {
      console.error('Selenium test failed:', error);
      ipcRenderer.send('show-message-box', {
        type: 'error',
        title: 'Script Error',
        message: error.toString(),
      });
      // dialog.showMessageBox(mainWindow, {
    //   dialog.showMessageBox(null,{
    //       message: `Script Error:  ${error}`
    //     });
    }
  };
  const handleRunAAC = async () => {
    const login = await appStore.fetchItem('aac_login')

    const username = CryptoJS.AES.decrypt(login['username'], encryptionKey).toString(CryptoJS.enc.Utf8);
    const password = CryptoJS.AES.decrypt(login['password'], encryptionKey).toString(CryptoJS.enc.Utf8);

    try {
      let scriptPath = path.join(extras, 'automations', 'AAC.js'); // Adjust the path
      if(env == 'test'){
        console.log('test AAC')
        scriptPath = path.join(__dirname, '../src/automations', 'AAC.js'); // Adjust the path
      }
      console.log('Current directory:', __dirname);
      console.log('Selenium module path:', path.join(__dirname, 'node_modules', 'selenium-webdriver'));
      console.log('Chromedriver module path:', path.join(__dirname, 'node_modules', 'chromedriver'));


      // Show a dialog while the script is running
      ipcRenderer.send('show-message-box', {
        type: 'info',
        title: 'AAC Script',
        message: 'AAC script is running...',
      });
      // await runSeleniumTest();
      // const scriptPath = path.join(__dirname, 'automations', 'AAC.js'); // Adjust the path
      
  
     console.log('isHeadless:',isHeadless)
      // Run the Selenium script as a child process
      const seleniumProcess = childProcess.spawn('node', [scriptPath, username, password,isHeadless]);
  
      // Handle script output
      seleniumProcess.stdout.on('data', (data) => {
        console.log(`Selenium Script Output: ${data}`);
      //   dialog.showMessageBox(mainWindow, {
      // // dialog.showMessageBox(null,{
      //     message: `Script Error:  ${data}`
      //   })
      });
  
      seleniumProcess.stderr.on('data', (data) => {
        console.error(`Selenium Script Error: ${data}`);
        ipcRenderer.send('show-message-box', {
          type: 'error',
          title: 'Script Error',
          message: data.toString(),
        });
        // dialog.showMessageBox(mainWindow, {
      // dialog.showMessageBox(null,{
      //     message: `Script Completed`
      //   })
      });
  
      seleniumProcess.on('close', (code) => {
        console.log(`Selenium Script exited with code ${code}`);
        if(error){
          ipcRenderer.send('show-message-box',{
            type: 'info',
            title: 'AAC Script',
            message: 'AAC script failed to complete.',
          });
        }
        else{
          ipcRenderer.send('show-message-box',{
            type: 'info',
            title: 'AAC Script',
            message: 'AAC script completed.',
          });
        }
        setError(true)
      });
  
      // await runSeleniumTest();
    } catch (error) {
      console.error('Selenium test failed:', error);
      ipcRenderer.send('show-message-box', {
        type: 'error',
        title: 'Script Error',
        message: error.toString(),
      });
      // dialog.showMessageBox(mainWindow, {
      // dialog.showMessageBox(null,{
      //   message: `Script Error:  ${error}`
      // })
    }
  };


  const handleCheckboxChange = () => {
    // Toggle the checkbox value
    setIsHeadless(!isHeadless);
    console.log("!isHeadless:",!isHeadless)
  };

  useEffect(() => {
    // Function to check if the current time is 1:05 AM
    const checkAndRunScript = async () => {
      const currentDate = new Date();
      const currentHour = currentDate.getHours();
      const currentMinute = currentDate.getMinutes();

      if (currentHour === 1 && currentMinute === 5) {
        console.log('Running AAC script at 1:05 AM');
        await handleRunAAC();
      }
    };

    // Set interval to check and run the script every minute
    const intervalId = setInterval(checkAndRunScript, 60000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // The empty dependency array ensures that this effect runs only once when the component mounts

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
          <>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleRegister}>Register</button>
          </>
          ):(
            <p>Welcome {user.username}</p>
          )
        }
        <p>Version: {version}</p>
        <button onClick={handleRunQuopi}>Quopi</button>
        <button onClick={handleRunAAC}>AAC</button>
        <label>
          <input
            type="checkbox"
            checked={isHeadless}
            onChange={handleCheckboxChange}
          />
          Headless
        </label>
      </header>
    </div>
  );
}
