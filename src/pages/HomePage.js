import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = ({ user }) => {
  const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div>
      <h1>Welcome to the Classroom Management System</h1>
      {user ? (
        <div>
          <p>Welcome, {user.name}!</p>
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
