import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(express.json({}))
app.use({
    cors:{
        origin:"http://localhost:5173",
    }
})

const server = new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        credentials:true,
        methods:["POST","GET"]
    }
})

const onlineUsers = new Map();

io.on("connection",(socket) => {
    
})