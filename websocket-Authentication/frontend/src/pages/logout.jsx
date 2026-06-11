import axios from "axios"
import { useNavigate } from "react-router-dom";

export const Logout = ({setUser}) => {
    const navigate = useNavigate()
    const logOut = async(e) => {
        e.preventDefault();
        await axios.get(
            "http://localhost:3000/logout",
            {},
            {withCredentials:true}
        )
        localStorage.removeItem("user");
        setUser(null);
        navigate('/')
    }
  return (
    <>
    <form onSubmit={logOut}>
        <button className="btn" type="submit">logout</button>
    </form>
    </>
  )
}
