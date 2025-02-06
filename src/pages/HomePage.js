// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Classroom Management System</h1>
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
    </div>
  );
};

export default HomePage;
