// SocketContext.js

import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

    // const socket = io('http://127.0.0.1:5000');
  useEffect(() => {
    console.log('creating socket')
    const newSocket = io('http://127.0.0.1:5000'); // Replace with your server URL
    setSocket(newSocket);

    return () => {
      newSocket.disconnect(); // Disconnect the socket when the component unmounts
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
