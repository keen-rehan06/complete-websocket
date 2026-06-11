import { configDotenv } from "dotenv";
configDotenv({path:"./.env"})

import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./user.route.js"
import { socketAuth } from "./socketAuth.js";

const app = express();
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json());
app.use(cookieParser());

app.use("/",userRoute);


const server = createServer(app);

const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        credentials:true
    }
})

io.use(socketAuth);

io.on("connection",(socket) => {
    console.log("User connected",socket.id);
    socket.on("send-message",(data) => {
        io.emit("receive-message",{
            socketId:socket.id,
            message:data.message
        })
    })
    socket.on('disconnect',() => {
        console.log("Disconnected",socket.id)
    })
})

server.listen(3000, () => {
  console.log("Server Running");
});
