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

  const connectSocket = (serverUrl, username) => {
    const socketConnection = io(serverUrl, { query: { username } });

    socketConnection.on('connect', () => {
      setSocket(socketConnection);
      setSocketConnected(true);
      setErrorMessage('');
    });

    socketConnection.on('connectionRejected', (message) => {
      setErrorMessage(message);
    });

    socketConnection.on('updateUserList', (users) => {
      setConnectedUsers(users);
    });

    socketConnection.on('disconnect', () => {
      setSocket(null);
      setSocketConnected(false);
      setConnectedUsers([]);
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
