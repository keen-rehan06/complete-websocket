import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(`${socket.id} User connected.`);
  socket.on("join-room", (roomName) => {
    socket.join(roomName);
    console.log(`${socket.id} join ${roomName}`);
  });

 socket.on("send-message",({roomName,message}) => {
    io.to(roomName).emit("receive-message",{
        socketId:socket.id,
        message
    })
 })

});

server.listen(3000, () => {
  console.log("App is running on port 3000");
});
