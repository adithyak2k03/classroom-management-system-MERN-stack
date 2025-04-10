import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signupUserApi } from "../services/api";
import "../stylesheets/Signup.css";
import { UserContext } from "../context/UserContext";
import LoadingScreen from "../components/LoadingScreen";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { loading, setLoading } = useContext(UserContext); // Add this to control loading screen

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      setLoading(true); // Show loading screen

      const data = await signupUserApi(name, email, password);

      setLoading(false); // Hide after response

      if (data.message) {
        alert("Signup successful! Please login.");
        navigate("/login");
      } else {
        alert(data.error || "Signup failed");
      }
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

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
        <a href="/login" className="login-link">
          Login
        </a>
      </p>
    </div>
  );
};

export default Signup;
