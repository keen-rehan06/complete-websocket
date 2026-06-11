import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const login = ({ setUser }) => {
  const navigate = useNavigate(); // ✅ yaha

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:3000/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },  
      );
     localStorage.setItem("user",JSON.stringify(data.accessToken))
      setUser(data.message);
      console.log(data)
      alert("Login Success");

      navigate("/chat");
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed!");
    }
  };
  return (
    <>
      <form onSubmit={loginUser}>
        <input
          type="text"
          placeholder="Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Login</button>
      </form>
    </>
  );
};

export default login;
