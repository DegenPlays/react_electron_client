// import logo from './logo.svg';
// import './App.css';
// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';


// function App() {
//   // const [socket, setsocket] = useState(null);
//   const [subscriptionStats, setSubscriptionStats] = useState(null);
//   const [wallet, setWallet] = useState(null);
//   const [accountCreated, setAccountCreated] = useState('not created');
  

//   useEffect(() => {
//     // Connect to the Socket.IO server
//     const socket = io('http://127.0.0.1:5000');
//     // setsocket(socket);

//     // Send a message to the server on component mount
//     socket.emit('get-subscription-stats');

//     // Handle the server's reply
//     socket.on('subscription-stats', (data) => {
//       // Handle the subscription stats received from the server
//       console.log('Received subscription stats:', data);
//       setSubscriptionStats(data);
//     });

//     socket.on('create_userEvent-response', (data) => {
//       console.log('Received create_userEvent response:', data);
//       setAccountCreated(data.message);
//       // Handle the response from the server, e.g., display a message to the user
//     });

//     // Cleanup the socket connection on component unmount
//     return () => {
//       // socket.disconnect();
//     };
//   }, []); // Empty dependency array means this effect runs once after the initial render

//   // required_fields = ['unique_id', 'subscription_start_date', 'subscription_end_date', 'number_of_contracts']
//   async function handleCreateAccount() {
//     const socket = io('http://127.0.0.1:5000');
    
//     socket.emit('create_userEvent', {
//       'username': 'testyMctesterFace',
//       'email': 'test@test.com',
//       'unique_id': 1,
//       'wallet': wallet,
//       'number_of_contracts': 5
//     });
  
//     // Wait for the server response before updating the state
//     const response = await new Promise(resolve => {
//       socket.on('create_userEvent-response', (data) => {
//         resolve(data);
//         setAccountCreated(data);
//       });
//     });
  
//     console.log('Server response:', response);
//     setAccountCreated(response.message);
//   }

//   const handleWalletChange = (e) => {
//     if(e.target.value ==''){
//         return
//     }
//     setWallet(e.target.value);
// };
  
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//         <input type="string" value={wallet} onChange={handleWalletChange}/>
//         {/* <w3m-button /> */}
//         {subscriptionStats ? (
//           <p>Subscription Stats: {JSON.stringify(subscriptionStats)}</p>
//         ) : (
//           <p>Loading subscription stats...</p>
//         )}
//         <button onClick={handleCreateAccount}>Create Account</button>
//         <div>{accountCreated}</div>
//       {/* Other JSX for your component */}
//       </header>
//     </div>
//   );
// }

// export default App;


import React from 'react';
// import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import { HashRouter as Router, Route, Routes  } from 'react-router-dom';

import NavigationBar from './components/NavigationBar';
// import HomePage from './components/HomePage';
import HomePage from './pages/HomePage';
import SettingsPage from './components/SettingsPage';

const App = () => {
  return (
    <Router>
      <NavigationBar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        {/* <Route path="/" element={HomePage} /> */}
        {/* <Route path="/settings" component={SettingsPage} /> */}
        {/* Add more routes for additional pages */}
      </Routes>
    </Router>
  );
};

export default App;

// import React from 'react';
// // import HomePage from './components/HomePage';
// import HomePage from './pages/HomePage';
// // import About from './components/SettingsPage';
// import SettingsPage from './components/SettingsPage';

// function App() {
//   return (
//     <div>
//       <HomePage />
//       <SettingsPage />
//     </div>
//   );
// }

// export default App;