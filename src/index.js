import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import { HashRouter as Router } from 'react-router-dom';
import { SocketProvider } from './components/SocketContext'; // Adjust the path
// import HomePage from './components/HomePage';
// import Header from './components/header'
// import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'

// import { WagmiConfig } from 'wagmi'
// import { arbitrum, mainnet } from 'viem/chains'

// // 1. Get projectId
// const projectId = 'YOUR_PROJECT_ID'

// // 2. Create wagmiConfig
// const metadata = {
//   name: 'Web3Modal',
//   description: 'Web3Modal Example',
//   url: 'https://web3modal.com',
//   icons: ['https://avatars.githubusercontent.com/u/37784886']
// }

// const chains = [mainnet, arbitrum]
// const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

// // 3. Create modal
// createWeb3Modal({ wagmiConfig, projectId, chains })


// const root = ReactDOM.createRoot(document.getElementById('root'));

const root = document.getElementById('root');
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <SocketProvider>
      <App />
    </SocketProvider>
  </React.StrictMode>
);
// root.render(
//     <React.StrictMode>
//       <Router>
//       {/* <WagmiConfig config={wagmiConfig}> */}
//         {/* <Header/> */}
//         <App />
//       {/* </WagmiConfig> */}
//       </Router>
//     </React.StrictMode>
// );
