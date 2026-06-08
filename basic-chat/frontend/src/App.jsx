import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
const App = () => {
  const socket = useMemo(() => io("http://localhost:3000"), []);
  const [socketId, setSocketId] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id);
      console.log("Connected:", socket.id);
    });

    socket.on("receive-message", (data) => {
      setMessages((message) => [...message, data]);
    });

    return () => {
      socket.off("connect");
      socket.off("receive-message");
      socket.disconnect();
    };
  }, [socket]);

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("message", {
      socketId,
      message,
    });
    setMessage("");
  };

  return (
    <>
    <h1>{socketId}</h1>
      <div className="chat">
        <div className="messages">
          {messages.map((m, i) => {
            return <p key={i}>
              {m.socketId}: {m.message}
            </p>;
          })}
        </div>
      </div>
      <div className="chat-input">
        <form onSubmit={sendMessage}>
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </>
  );
};

export default App;
