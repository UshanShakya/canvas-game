import React, { useState, useEffect } from 'react';
import TextInput from './GenericComponents/TextInput';
import { useSocket } from '../Socket/SocketContext';

function GameCard() {
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [serverName, setServerName] = useState('');
  const { socketConnected, connectSocket, disconnectSocket, connectedUsers, errorMessage } = useSocket();

  useEffect(() => {
    if (socketConnected) {
      localStorage.setItem('username', username);
    } else {
      localStorage.removeItem('username');
    }
  }, [socketConnected, username]);

  const handleConnectClick = () => {
    if (!username) {
      alert('Please enter a username.');
      return;
    }

    console.log(`Connecting to server ${serverName} as ${username}`);
    connectSocket(process.env.REACT_APP_SERVER_URL, username);
  };

  const handleDisconnectClick = () => {
    console.log(`Disconnecting from server ${serverName} as ${username}`);
    disconnectSocket();
  };

  return (
    <div className="card p-4 mb-4" style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Connect to the Game</h2>
      <TextInput
        label="Username"
        id="username"
        value={username}
        onChange={setUsername}
        disabled={!localStorage.getItem('username') && socketConnected}
      />
      <TextInput
        label="Server Name"
        id="serverName"
        value={serverName}
        onChange={setServerName}
      />
      <button className="btn btn-primary mt-3" onClick={handleConnectClick}>Connect</button>
      {socketConnected && <button className="btn btn-danger mt-3" onClick={handleDisconnectClick}>Disconnect</button>}
      {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
      
      {socketConnected && (
        <div className="mt-4">
          <h3>Connected Users:</h3>
          <ul className="list-group">
            {connectedUsers.map((user, index) => (
              <li key={index} className="list-group-item">{user}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default GameCard;


