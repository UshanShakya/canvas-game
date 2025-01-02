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
let connectedUsers = [];

io.on("connection", (socket) => {
  const username = socket.handshake.query.username;
  if (connectedUsers.find((user) => user.username === username)) {
    socket.emit("connectionRejected", "This username is already taken.");
    socket.disconnect();
    return;
  }
  connectedUsers.push({ id: socket.id, username }); // Send the updated user list to all clients
  io.emit(
    "updateUserList",
    connectedUsers.map((user) => user.username)
  );
  socket.on("disconnect", () => {
    connectedUsers = connectedUsers.filter((user) => user.id !== socket.id);
    io.emit(
      "updateUserList",
      connectedUsers.map((user) => user.username)
    );
  });
});
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
