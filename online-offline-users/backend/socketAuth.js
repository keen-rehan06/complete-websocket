import jwt from "jsonwebtoken";
import cookie from "cookie";

export const socketAuth = (socket, next) => {
  try {
    const cookies = cookie.parse(socket.handshake.headers.cookie || "");
    const token = cookies.accessToken;
    if (!token) return next(new Error("UnAuthorized"));
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded;
    next();
  } catch (error) {
    console.log(error.message);
    throw new Error(error);
  }
};
