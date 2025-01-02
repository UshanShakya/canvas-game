// frontend/src/components/DrawingCanvas.js
import React, { useEffect, useRef, useState } from 'react';
import {Button} from 'react-bootstrap'
import io from 'socket.io-client';

const DrawingCanvas = () => {
  const canvasRef = useRef(null);
  const [socket, setSocket] = useState(null);

  const callConnection = ()=>{
    const socketConnection = io(process.env.REACT_APP_SERVER_URL);
    setSocket(socketConnection);
    return socketConnection;
  }

  useEffect(() => {
    const socketConnection = callConnection();
    return () => {
        socketConnection.disconnect();
      };
  }, []);
  
  const draw = (e) => {
    if (!socket) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { offsetX: x, offsetY: y } = e.nativeEvent;

    // Draw on the local canvas
    ctx.lineTo(x, y);
    ctx.stroke();

    // Send the drawing data to the server
    socket.emit('draw', { x, y });
  };

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  // Handle drawing from other clients
  useEffect(() => {
    if (!socket) return;

    socket.on('draw', (data) => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.lineTo(data.x, data.y);
      ctx.stroke();
    });
  }, [socket]);

  return (
    <>
    <Button variant="secondary" id="hello" onClick={callConnection}>Texasdat</Button>
    <canvas
      ref={canvasRef}
      width="600"
      height="400"
      style={{ border: '1px solid black' }}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={() => {}}
      onMouseLeave={() => {}}
    />
</>
  );
};

export default DrawingCanvas;