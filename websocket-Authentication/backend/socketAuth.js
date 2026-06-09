    import jwt from "jsonwebtoken";
    import cookie from "cookie";

    export const socketAuth = (socket, next) => {
    try {
        const cookies = cookie.parse(socket.handshake.headers.cookie || "");
        const accessToken = cookies.accessToken;
        if (!accessToken) return next(new Error("Unauthorized"));
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        socket.user = decoded;
        next();
    } catch (error) {
        next(new Error("Invalid Token"));
    }
    };
