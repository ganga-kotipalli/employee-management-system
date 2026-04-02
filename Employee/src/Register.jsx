import React,{useState} from 'react'
import axios from "axios";

import { useNavigate } from 'react-router-dom';
const Register = () => {

    const navigate = useNavigate();
    const[user,setUser] =useState({
        username:"",
        email:"",
        password:""
    })


  const handleChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:9091/auth/register", user)
      .then(() => alert("Registered Successfully"))
      .catch(() => alert("Error"));
      navigate("/login")
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" placeholder="Username" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" placeholder="Password" onChange={handleChange} />
      <button type="submit">Register</button>
    </form>
  );
}

export default Register