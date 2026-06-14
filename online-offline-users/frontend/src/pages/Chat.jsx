import { useEffect } from "react"
import {io} from "socket.io-client";
import Logout from "./Logout.jsx";

const Chat = ({setUser}) => {

    useEffect(()=>{
     const socket = io("http://localhost:3000", {
    withCredentials: true, 
    auth: {
        userId: "123", 
      },
  });

    socket.on('connect',() => {
      console.log(socket.id,'online')
    })
    socket.on('disconnect',() => {
      console.log(socket.id,'offline')
    })
      return () => {
    socket.disconnect();
  };
  },[])
  return (
    <>
    <h1>Welcome! to Chat App.</h1>
    <Logout setUser={setUser}/>
    </>
  )
}

export default Chat