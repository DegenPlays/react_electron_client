import logo from '../logo.svg';
import '../App.css';
import React, { useEffect, useState } from 'react';
import { socket } from '../components/socket';


export default function HomePage() {
  const [subscriptionStats, setSubscriptionStats] = useState(null);
  const [wallet, setWallet] = useState('');
  const [accountCreated, setAccountCreated] = useState('not created');
  const [data,setData] = useState(null);
  const version = '0.0.0.2'


  useEffect(() => {
    // Connect to the Socket.IO server
    console.log('socket:',socket)
    if (socket){
      // Send a message to the server on component mount
      // socket.emit('get-subscription-stats');

      // Handle the server's reply
      // socket.on('subscription-stats', (data) => {
      //   // Handle the subscription stats received from the server
      //   console.log('Received subscription stats:', data);
      //   setSubscriptionStats(data);
      // });

      socket.on('create_userEvent-response', (data) => {
        console.log('Received create_userEvent response:', data);
        setData(data)
        console.log(data)
        if(data.message){
          setAccountCreated(data.message);
        }
        else{
          setAccountCreated(data.error);
        }
        // Handle the response from the server, e.g., display a message to the user
      });
      socket.on('error', (error) => {
        console.error('Socket error:', error);
      });
    }
    // Cleanup the socket connection on component unmount
    return () => {
      socket.off('subscription-stats')
      socket.off('create_userEvent-response')
      // socket.disconnect();
    };
  }, []); // Empty dependency array means this effect runs once after the initial render

  async function handleCreateAccount() {
    socket.emit('create_userEvent', {
      'username': 'testyMctesterFace13456',
      'email': 'test13456@test.com',
      'unique_id': 123456,
      'wallet': wallet,
      'number_of_contracts': 5
    });
    console.log('create user triggered')
  }

  const handleWalletChange = (e) => {
    if(e.target.value ==''){
        return
    }
    setWallet(e.target.value);
};
  
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
        {/* <p>Version: {version}</p>
        {subscriptionStats ? (
          <p>Subscription Stats: {JSON.stringify(subscriptionStats)}</p>
        ) : (
          <p>Loading subscription stats...</p>
        )}
        <button onClick={handleCreateAccount}>Create Account</button>
        <div>{accountCreated}</div> */}
      </header>
    </div>
  );
}
