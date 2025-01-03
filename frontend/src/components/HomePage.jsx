import React, { useState } from 'react';
import TextInput from './GenericComponents/TextInput';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../Socket/SocketContext';

function HomePage() {
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [serverName, setServerName] = useState('');
  const { connectSocket, errorMessage } = useSocket();
  const navigate = useNavigate();

  const handleConnectClick = async () => {
    if (!username || !serverName) {
      alert('Please enter both username and server name.');
      return;
    }

    // Connect to the server
    const result = await connectSocket(process.env.REACT_APP_SERVER_URL, username, serverName);
    console.log(result)
    if (result.success)
      navigate(`/playgame/${serverName}`); // Navigate only if connection is successful
   
  };

  return (
    <div className="container mt-5 card p-4 mb-4" style={{ maxWidth: '400px', margin: 'auto' }} >
      <h2>Home Page</h2>
      <TextInput label="Username" value={username} onChange={setUsername} />
      <TextInput label="Server Name" value={serverName} onChange={setServerName} />

      <button className="btn btn-primary mt-3" onClick={handleConnectClick}>Connect to Server</button>

      {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
    </div>
  );
}

export default HomePage;
