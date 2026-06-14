  import express from "express";
  import cors from "cors";
  import { createServer } from "http";
  import { Server } from "socket.io";
  import { socketAuth } from "./socketAuth.js";
  import cookieParser from "cookie-parser";
  import userRoute from "./user.route.js"
  import {v4 as uuid} from "uuid"
  import { configDotenv } from "dotenv";
  configDotenv({path:"./.env"});
  const app = express();
  const server = createServer(app);

  app.use(express.json({}))
  app.use(cookieParser())
  app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
  }));

  app.use("/",userRoute);
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.use(socketAuth)
  const onlineUsers = new Map();
  io.on("connection",(socket) => {
    const userId = socket.handshake.auth?.userId;
    onlineUsers.set(userId,socket.id);
    console.log(`User ${userId} is online`);
      socket.on("disconnect", () => {
      onlineUsers.delete(userId);
      console.log(`User ${userId} offline`);
    });
  })

  server.listen(3000,() => {
      console.log("Server is running on port 3000");
  })