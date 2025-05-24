import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style/Login.css";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/admin/login", {
        username,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        console.log("Login successful. Token stored in localStorage.");
        navigate("/admin");
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("An error occurred while logging in.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <div className="login-left">
          <img src="/zingo.png" alt="zingo" className="zingo-img" />
        </div>
        <div className="login-right">
          <h2>
            Hello <strong>Admin</strong>
          </h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn login" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}