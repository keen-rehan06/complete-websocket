import { useEffect, useMemo, useState } from "react";
import { Logout } from "./logout.jsx";
import {io} from "socket.io-client"

const chat = ({setUser}) => {
  const accessToken = localStorage.getItem("accessToken");
  const socket = useMemo(() => {
    return io("http://localhost:3000",{
      auth:{
        token:accessToken,
      },
      withCredentials: true,
    })
},[])
  const [soketId,setSocketId] = useState("");
  const [message,setMessage] = useState("");
  const [messages,setMessages] = useState([]);

  useEffect(()=>{
   socket.on("connect",() => {
    setSocketId(socket.id);
    console.log(`User Connected ${socket.id}`)
   })
   socket.on("connect_error", (err) => {
  console.log("Error:", err);
})
    socket.on("receive-message",(data) => {
      setMessages((message) => [...message,data]);
    })
  },[socket]);

  const sendMessage = (e) => {
   e.preventDefault();
   socket.emit("send-message",{
    soketId,
    message
   })
  }

  return (
    <>
    <div className="heading">
    <h1>chatting</h1>
      <Logout setUser={setUser}/>
    </div>
    <h1>{soketId}</h1>
    <form onSubmit={sendMessage}>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)}/>
      <button>Send</button>
    </form>
    <div>
      {messages.map((m,i) => {
        return <p key={i}>{m.socketId}:{m.message}</p>
      })}
    </div>
    </>
  )
}
export default chat;