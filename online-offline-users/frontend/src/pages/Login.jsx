import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:3000/login",
        { email, password },
        { withCredentials: true },
      );

      setUser(true);

      alert("Login Success!");

      navigate("/chat");
    } catch (error) {
      console.log(error.message);
      alert(error.response?.data?.message || "Login Failed!");
    }
  };

  return (
    <form onSubmit={loginUser}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
