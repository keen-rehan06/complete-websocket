import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app)
const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        credentials:true
    }
})

io.on('connection',(socket) => {
    console.log(`user connected`,socket.id);
    socket.on('message',(data) => {
        console.log(data);
        io.emit('receive-message',{socketId:socket.id,message:data.message}); 
        console.log({socketId:socket.id,message:data.message})
    })
    socket.on("disconnect",() => {
        console.log("User Disconnected",socket.id)
    })
})

server.listen(3000,()=>{
    console.log("App is runnig on port 3000")
})