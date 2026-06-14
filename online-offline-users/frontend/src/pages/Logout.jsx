import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = ({setUser}) => {
    const navigate = useNavigate();
 const logOutUser = (e) => {
    e.preventDefault();
    axios.get('http://localhost:3000/logout',{withCredentials:true})
    setUser(false)
    navigate("/")
 }
  return <>
  <form onSubmit={logOutUser}>
    <button type="submit">Logout</button>
  </form>
  </>;
};

export default Logout;
