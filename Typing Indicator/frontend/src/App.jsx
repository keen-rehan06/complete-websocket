import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000", { withCredentials: true });

const App = () => {
  const [socketId, setSocketId] = useState("");
  const [message, setMessage] = useState("");
  const [typingUser, setTypingUser] = useState("");
  const typingTimeOut = useRef(null);
  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id);
    });
    socket.on("user-typing", (socketId) => {
      setTypingUser(socketId);
    });
    socket.on("stop-user-typing", () => {
      setTypingUser("");
    });
    return () => {
      socket.off("user-typing");
      socket.off("stop-user-typing");
    };
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setMessage(value);
    socket.emit("typing", { socketId });
    clearTimeout(typingTimeOut.current);
    typingTimeOut.current = setTimeout(() => {
      socket.emit("stop-typing", { socketId });
    }, 1000);
  };
  return (
    <>
      <h1>{socketId}</h1>
      <form>
        <input
          type="text"
          value={message}
          onChange={handleChange}
          placeholder="Type a message..."
        />
      </form>
      {typingUser && <p>{typingUser} is typing...</p>}
    </>
  );
};

export default App;
