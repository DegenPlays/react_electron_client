import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import { SocketProvider } from './components/SocketContext'; // Adjust the path

const root = document.getElementById('root');
ReactDOM.createRoot(root).render(
  <React.StrictMode>
      {/* <SocketProvider> */}
        <App />
      {/* </SocketProvider> */}
  </React.StrictMode>
);