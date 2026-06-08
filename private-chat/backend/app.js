import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express.Router();
const server = createServer(app);

const io = new Server(server,{
    cors:{
        origin:'http://localhost:5173',
        credentials:true
    }
})

io.on("connection",(socket) => {
    console.log(`User Connected ${socket.id}`)

    socket.on('private-message',({receiverId,message})=>{
        io.to(receiverId).emit("receive-private-message",{
            socketId:socket.id,
            message
        })
    })
});

server.listen(3000,() => {
    console.log('App is running on port 3000')
})