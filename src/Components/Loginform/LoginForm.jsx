import React, { useState } from "react";
import axios from "axios";
import { FaUserAlt } from "react-icons/fa";
import { TbPasswordUser } from "react-icons/tb";
import "./LoginForm.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      console.log("🔵 Sending Login Request:", { username, password });
  
      const response = await axios.post("http://localhost:5000/auth/login", { username, password });
  
      console.log("🟢 Login Response:", response.data);
  
      setMessage("Login successful!");
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      console.error("❌ Login Error:", error.response ? error.response.data : error.message);
      setMessage(error.response?.data?.message || "Invalid credentials");
    }
  };
  

  return (
    <div className="wrapper">
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        {message && <p>{message}</p>}
        <div className="input-box">
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <FaUserAlt className="icon" />
        </div>
        <div className="input-box">
          <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <TbPasswordUser className="icon" />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
