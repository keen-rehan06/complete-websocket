export const socketAuth = (socket, next) => {
  try {
    console.log("Cookie Header:", socket.handshake.headers.cookie);

    const cookies = cookie.parse(socket.handshake.headers.cookie || "");
    console.log("Parsed Cookies:", cookies);

    const accessToken = cookies.accessToken;
    console.log("Token:", accessToken);

    if (!accessToken) {
      return next(new Error("Unauthorized"));
    }

    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    socket.user = decoded;

    next();
  } catch (error) {
    console.log(error);
    next(new Error("Invalid Token"));
  }
};