import { useEffect } from "react"
import {io} from "socket.io-client";
const App = () => {
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
    <div>
      <h1>Socket Connected</h1>
    </div>
  )
}

export default App