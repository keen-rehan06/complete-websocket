import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer();

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("send-message", (data) => {
    io.emit("receive-message", {
      socketId: socket.id,
      message: data.message,
    });
  });
});

server.listen(3000,() => {
    console.log("Server is running on port 3000");
})