import React,{useState} from 'react'
import axios from "axios";

import { useNavigate } from 'react-router-dom';
const Login = () => {

    const navigate=useNavigate();

    const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:9091/auth/login", user)
      .then(res => alert(res.data))
      .catch(() => alert("Error"));

      navigate("/employee")
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" placeholder="Password" onChange={handleChange} />
      <button type="submit">Login</button>
    </form>
  );
}
  

export default Login