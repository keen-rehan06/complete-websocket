import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import { messageModel } from "./messageModel.js";

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

await mongoose.connect("mongodb://127.0.0.1:27017/chat");
const onlineUsers = new Map();

io.on("connection", async (socket) => {
  const userId = socket.handshake.auth.userId;
  console.log("User Connected", userId);

  // Online save
  onlineUsers.set(userId, socket.id);

  // show online user to everyone
  io.emit("user-online", userId);

  // send pending message
  const pendingMessages = await messageModel.find({
    receiverId: userId,
  });

  socket.emit("pending-message", pendingMessages);

  // delivered true kar do
  await messageModel.updateMany(
    {
      receiverId: userId,
      delivered: false,
    },
    {
      delivered: true,
    },
  );

  // Send Message
  socket.on("send-message", async ({ receiverId, text }) => {
    const receiverSocketId = onlineUsers.get(receiverId);
    // Receiver online
    if (receiverId) {
      const newMessage = await messageModel.create({
        senderId: userId,
        receiverId,
        text,
        delivered: true,
      });
      io.to(receiverSocketId).emit("receive-message", newMessage);
      // sender ko bhi show karo
      socket.emit("receive-message", newMessage);
    }
    else{
          // Receiver offline
          await messageModel.create({
            senderId:userId,
            receiverId,
            text,
            delivered:false
          })
    }
  });
  // Disconnect
  socket.on('disconnect',() => {
   onlineUsers.delete(userId);
    io.emit(
      "user-offline",
      userId
    );

    console.log(
      `User ${userId} disconnected`
    );
  })
});

server.listen(3000,() => {
   console.log("Server Running");
})