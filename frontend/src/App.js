import logo from './logo.svg';
import './App.css';
import DrawingCanvas from './components/DrawingCanvas';
import 'bootstrap/dist/css/bootstrap.min.css';
<script src="https://cdn.jsdelivr.net/npm/react-bootstrap@2.8.0/dist/react-bootstrap.min.js"></script>
function App() {
  return (
    <div className="App">
      <h1>Real-time Drawing Game</h1>
      <DrawingCanvas />
    </div>
  );
}

export default App;
