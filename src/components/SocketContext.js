// SocketContext.js

import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://35.166.222.12:5000')//io('http://127.0.0.1:5000'); // Replace with your server URL
    setSocket(newSocket);

    // Cleanup logic on component unmount
    return () => {
      newSocket.disconnect(); // Disconnect the socket when the component unmounts
    };
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
