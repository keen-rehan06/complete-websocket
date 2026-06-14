import { useState } from "react";
import Login from "./pages/Login.jsx";
import Chat from "./pages/Chat.jsx";
import { Route, Routes } from "react-router-dom";
const App = () => {
  const [user, setUser] = useState(false);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={!user ? <Login setUser={setUser} /> : <Chat />}
        />
      </Routes>
      <Routes>
        <Route
          path="/chat"
          element={user ? <Chat setUser={setUser} /> : <Login setUser={setUser} />}
        />
      </Routes>
    </>
  );
};

export default App;
