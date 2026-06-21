import express from "express";
import { createServer } from "http";
import {Server} from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server,{
    cors:{
        origin:"*",
    },
});

// Store online users
const onlineUsers = new Map();


io.on("connection",(socket) =>{
    console.log("user connected:",socket.id);
    const userId = socket.handshake.query.userId;
     // 🟢 USER ONLINE
  onlineUsers.set(userId,{
    socketId:socket.id,
    status:"online",
    lastSeen:null,
  });
  console.log(`${userId} is online.`)

  // broadcast to all

  io.emit("user-online",{userId});
  
  // send current online users list
  io.emit("online-users",Array.from(onlineUsers.keys()))

  // 🔴 DISCONNECT
  socket.on("disconnect",() => {
    onlineUsers.set(userId,{
        socketId:socket.id,
        status:"offline",
        lastSeen:Date.now()
    })

    console.log(`${userId} is offline`);

    io.emit("user-offline", { userId });
  })
});

app.get("/",(req,res)=>{
    res.send({
        users:Array.from(onlineUsers.entries())
    })
})

server.listen(3000,() => {
    console.log("App is running on port 3000");
})