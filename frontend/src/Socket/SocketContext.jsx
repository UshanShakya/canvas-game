import React, { createContext, useContext, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const connectSocket = (serverUrl, username, serverName) => {
    return new Promise((resolve) => {
      const socketConnection = io(serverUrl, { query: { username, serverName } });
  
      let isConnectionRejected = false; // Track if connection was rejected
  
      socketConnection.on('connect', () => {
        if (!isConnectionRejected) {
          setSocket(socketConnection);
          setSocketConnected(true);
          setErrorMessage('');
          resolve({ success: true, message: "Connection Successful" });
        }
      });
  
      socketConnection.on('connectionRejected', (message) => {
        isConnectionRejected = true;
        setErrorMessage(message);
        resolve({ success: false, message: message });
        socketConnection.disconnect(); // Ensure socket is disconnected after rejection
      });
  
      socketConnection.on('updateUserList', (users) => {
        setConnectedUsers(users);
      });
  
      socketConnection.on('disconnect', () => {
        setSocket(null);
        setSocketConnected(false);
        setConnectedUsers([]);
      });
    });
  };
  

  const disconnectSocket = () => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
      setSocketConnected(false);
      setConnectedUsers([]);
    }
  };

  return (
    <SocketContext.Provider value={{ socket, socketConnected, connectedUsers, connectSocket, disconnectSocket, errorMessage }}>
      {children}
    </SocketContext.Provider>
  );
}
