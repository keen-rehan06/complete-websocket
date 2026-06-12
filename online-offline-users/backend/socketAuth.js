import jwt from "jsonwebtoken";
import cookie from "cookie";

export const socketAuth = (socket,next) => {
   try {
    const cookies = cookie.parse(socket.handshake.headers.cookie || "");
   } catch (error) {
    
   }
} 