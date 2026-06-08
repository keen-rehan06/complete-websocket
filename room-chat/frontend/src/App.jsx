import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { io } from "socket.io-client";

const App = () => {
  const socket = useMemo(() => io("http://localhost:3000"), []);
  const [socketId,setSocketId] = useState("")
  const [roomName, setRoomName] = useState("");
  const [message, setMessage] = useState("");
  const [groupName,setGroupName] = useState("")
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected", socket.id);
      setSocketId(socket.id)
    });

    socket.on("receive-message", (data) => {
      setMessages((message) => [...message, data]);
      console.log('Received',data);
    });
    return () => {
      socket.off("receive-message");
    };
  }, [socket]);

  const joinRoom = (e) => {
    e.preventDefault();
    socket.emit("join-room", roomName);
    alert(`you joined ${roomName} group.`)
      setGroupName(`You joined ${roomName}.`)
  };

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("send-message", { roomName, message });
    setMessage("");
  };
  return (
    <>
   <h1>Online Group Chat</h1>

 <h3>{groupName}</h3>
<form className="join-form" onSubmit={joinRoom}>
  <input
    type="text"
    placeholder="enter room name"
    value={roomName}
    onChange={(e) => setRoomName(e.target.value)}
  />

  <button type="submit">Join</button>
</form>
      <form className="send-form" onSubmit={sendMessage}>
        <input 
        type="text"
        placeholder="type your message....."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">send</button>
      </form>
        <div className="chat-container">
  {messages.map((m, i) => {
    const isMe = m.socketId === socketId;

    return (
      <div
        key={i}
        className={`message ${isMe ? "my-message" : "other-message"}`}
      >
        <p>{m.message}</p>
      </div>
    );
  })}
</div>
    </>
  );
};

export default App;
