import express from "express";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import messageModel from "./messageModel.js";

mongoose.connect("mongodb://127.0.0.1:27017/chat");

const app = express();
app.use(express.json());
app.use("/auth", authRoutes);
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});
const onlineUsers = new Map();
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // user online register
  socket.on("join", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  // send message
  socket.on("send-message", async (data) => {
    const { sender, receiver, text, status } = data;
    const message = await messageModel.create({
      sender,
      receiver,
      text,
      status: "sent",
    });
    const reciverSocket = onlineUsers.get(receiver);
    // if online → deliver
    if (reciverSocket) {
      io.to(reciverSocket).emit("recive-message", message);
    }
  });
  // delivered
  socket.on("message-delivered", async ({ messageId }) => {
    const msg = await messageModel.findByIdAndUpdate(
      messageId,
      { status: "deliverd" },
      { new: true },
    );
    const senderSocket = onlineUsers.get(msg.sender);
    if (senderSocket) {
      io.to(senderSocket).emit("status-update", msg);
    }
  });
  // seen
  socket.on("message-seen", async ({ messageId }) => {
    const msg = await messageModel.findByIdAndUpdate(
      messageId,
      { status: "seen" },
      { new: true },
    );
    const senderSocket = onlineUsers.get(msg.sender);
    if (senderSocket) {
      io.to(senderSocket).emit("status-update", msg);
    }
  });
  socket.on("disconnect", () => {
    for (let [userId, id] of onlineUsers) {
      if (id === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }
  });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
