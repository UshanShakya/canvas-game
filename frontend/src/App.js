import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import GameCard from './components/GameCard';
<script src="https://cdn.jsdelivr.net/npm/react-bootstrap@2.8.0/dist/react-bootstrap.min.js"></script>

function App() {
  return (
    <div className="container mt-5">
      <GameCard />
    </div>
  );
}

export default App;
