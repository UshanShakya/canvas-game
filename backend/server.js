const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Replace this with the frontend URL
  },
});

io.on("connection", (socket, user) => {
  console.log(user)
  console.log("A user connected");
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
  socket.on('draw', (data) => {
    socket.broadcast.emit('draw', data);
  });
})
;


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
