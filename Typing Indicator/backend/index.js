import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";

const app = express();
const server = createServer(app)
const io = new Server(server,{
   cors:{
        origin:"http://localhost:5173",
        credentials:true
    }
})

io.on("connection",(socket)=> {
    console.log("User Connected",socket.id);
    socket.on("typing",({socketId}) => {
      console.log(`${socketId} is typing...`)
      socket.broadcast.emit("user-typing",socketId)
    });
    socket.on("stop-typing",(socketId)=>{
        socket.broadcast.emit("stop-user-typing");
    });
});

server.listen(3000,() => {
    console.log('App is running on port 3000.')
})