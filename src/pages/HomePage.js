import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = ({ user }) => {
  const navigate = useNavigate();

  // Logout function to remove the user from localStorage and navigate to login page
  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user from localStorage
    navigate("/"); // Redirect to login page
  };

  return (
    <div>
      <h1>Welcome to the Classroom Management System</h1>
      {user ? (
        <div>
          <p>Welcome, {user.username}!</p> {/* Display user's name or username */}
          <div>
            <Link to="/notes">
              <button>Go to Notes</button>
            </Link>
          </div>
          <div>
            <Link to="/tasks">
              <button>Go to To-Do List</button>
            </Link>
          </div>
          <div>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      ) : (
        <div>
          <p>You are not logged in. Please log in first.</p>
          <Link to="/">
            <button>Go to Login</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomePage;
