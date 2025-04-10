import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginUserApi } from "../services/api";
import "../stylesheets/Login.css";
import { UserContext } from "../context/UserContext";
import LoadingScreen from "../components/LoadingScreen";

const Login = () => {
  const { setUser, setLoading, loading } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true); // You'll need this from context
      const data = await loginUserApi(email, password);

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        setUser(data.user);
        setLoading(false);

        navigate("/dashboard");
      } else {
        setLoading(false);
        alert(data.error || "Login failed");
      }
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
  };

  if (loading) {
    return <LoadingScreen />; // ✅ Show loading screen during login
  }

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
          required
        />

        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <p className="login-text">
        Don't have an account?{" "}
        <a href="/signup" className="signup-link">
          Sign Up
        </a>
      </p>
    </div>
  );
};

export default Login;
