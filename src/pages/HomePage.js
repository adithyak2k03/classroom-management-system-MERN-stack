import { Link } from "react-router-dom";
import "../stylesheets/HomePage.css";

const HomePage = () => {
  return (
    <div className="homepage-container">
      {/* Title and Tagline */}
      <h1 className="homepage-title">Classroom Management System</h1>
      <p className="homepage-tagline">Organize your classroom effortlessly!</p>

      {/* Buttons */}
      <div className="button-container">
        <Link to="/login" className="homepage-btn login-btn">
          Login
        </Link>
        <Link to="/signup" className="homepage-btn signup-btn">
          Signup
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
