import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = createServer(app);

const io = new Server(server,{
   cors:{
     origin:"http://localhost:3000",
     credentials:true
   }
});

// Admin Namespace

io.of("/admin").on("connection",(socket)=>{
    console.log("Admin Connected");

  socket.on("delete-user", (userId) => {
    console.log("Delete User:", userId);
  });
})

io.of("/chat").on("connection",(socket) => {
    socket.on("send-message",(data) => {
      console.log("message",data);
      io.emit("receive-message",data);
    })
})

server.listen(3000,() => {
  console.log("Server is running on port 3000")
})