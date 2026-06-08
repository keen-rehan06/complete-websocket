import { useState, useMemo, useEffect } from "react";
import { io } from "socket.io-client";

const App = () => {
  const socket = useMemo(() => io("http://localhost:3000"), []);
  const [socketId, setSocketId] = useState("");
  const [receiverId, setreceiverId] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {

    socket.on('connect',() => {
      setSocketId(socket.id);
    })
    socket.on("receive-private-message", (data) => {
      setMessages((prev) => [...prev, data]);
    });
    return () => socket.off("receive-private-message");
  }, [socket]);

  const sendPrivateMessage = (e) => {
    e.preventDefault();
    socket.emit("private-message", {
      receiverId,
      message,
    });
    setMessage("");
  };
  return (
    <>
    <h2>Your Id: {socketId}</h2>
      <form onSubmit={sendPrivateMessage}>
        <input type="text" value={receiverId} onChange={(e) => setreceiverId(e.target.value)}/>
        <br />
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)}/>
        <button>Send</button>
      </form>
      <div>
        {messages.map((m,i)=>{
          return <p key={i}>{m.socketId} : {m.message}</p>
        })}
      </div>
    </>
  );
};

export default App;
