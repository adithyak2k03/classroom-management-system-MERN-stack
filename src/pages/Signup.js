import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUserApi } from "../services/api";
import "../stylesheets/Signup.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const data = await signupUserApi(name, email, password);

      if (data.message) {
        alert("Signup successful! Please login.");
        navigate("/");
      } else {
        alert(data.error || "Signup failed");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">Sign Up</h1>
      <form onSubmit={handleSignup} className="signup-form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="signup-input"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="signup-input"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="signup-input"
          required
        />
        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>
      <p className="signup-text">
        Already have an account?{" "}
        <a href="/" className="login-link">
          Login
        </a>
      </p>
    </div>
  );
};

export default Signup;
