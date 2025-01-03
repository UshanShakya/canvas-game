const express = require("express");
const http = require("http");
require("dotenv").config();
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
});
let connectedUsers = {}; // Store connected users by server

io.on("connection", (socket) => {
  const username = socket.handshake.query.username;
  const serverName = socket.handshake.query.serverName;

  // Ensure that username isn't already taken in the given server
  if (connectedUsers[serverName]?.find((user) => user.username === username)) {
    console.log('i amm here')
    socket.emit("connectionRejected", "This username is already taken in this server.");
    return;
  }

  // Add user to the appropriate room (server)
  if (!connectedUsers[serverName]) {
    connectedUsers[serverName] = [];
  }
  connectedUsers[serverName].push({ id: socket.id, username });

  // Join the specific server (room)
  socket.join(serverName);

  // Notify all users in the room of the updated user list
  io.to(serverName).emit("updateUserList", connectedUsers[serverName].map(user => user.username));

  // Handle disconnect
  socket.on("disconnect", () => {
    connectedUsers[serverName] = connectedUsers[serverName].filter((user) => user.id !== socket.id);
    io.to(serverName).emit("updateUserList", connectedUsers[serverName].map(user => user.username));
    console.log('disconnected', connectedUsers);
  });
  console.log(connectedUsers);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
