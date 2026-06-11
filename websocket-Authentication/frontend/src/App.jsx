import { useState } from 'react'
import {Routes,Route} from "react-router-dom";
import Login from './pages/login.jsx';
import Chat from "./pages/chat.jsx"

const App = () => {
  const [loginStatus,setloginStatus] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  return (
    <>
      <Routes>
        <Route
        path='/'
        element={!loginStatus ? <Login setUser={setloginStatus}/>: <Chat/>}
        />
      </Routes>
      <Routes>
        <Route
        path='/chat'
        element={loginStatus ? <Chat setUser={setloginStatus}/> : <Login setUser={setloginStatus}/>}
        />
      </Routes>
    </>
  )
}

export default App