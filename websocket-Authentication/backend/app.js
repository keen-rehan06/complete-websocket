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

server.listen(3000, () => {
  console.log("Server Running");
});
