import React from 'react';
import { useSocket } from '../Socket/SocketContext';
import { useNavigate, useParams } from 'react-router-dom';

function PlayGamePage() {
  const { disconnectSocket, connectedUsers } = useSocket();
  const navigate = useNavigate();
  const { serverName } = useParams(); // Get the server name from the URL

  const startGame = () => {
    console.log("Game is starting on server:", serverName);
  };

  const handleDisconnect = () => {
    disconnectSocket(); // Disconnect the socket
    navigate('/'); // Redirect to HomePage to allow user to reconnect
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 mb-4" style={{ maxWidth: '500px', margin: 'auto' }}>
        <h2>Ready to Play on {serverName}!</h2> 
        <button className="btn btn-success" onClick={startGame}>Start Game</button>
        <div className="mt-3">
          <button className="btn btn-danger" onClick={handleDisconnect}>Disconnect</button>
        </div>
        
        {/* Display users connected to this server */}
        <div className="mt-4">
          <h4>Connected Users:</h4>
          <ul>
            {connectedUsers.map((user, index) => (
              <li key={index}>{user}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PlayGamePage;
