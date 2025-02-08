import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HomePage from './pages/HomePage';
import NoteHomePage from './pages/NoteHomePage';
import TaskHomePage from './pages/TaskHomePage';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const PrivateRoute = ({ element }) => {
    // Redirect to login if no user is found (not logged in)
    return user ? element : <Navigate to="/" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<PrivateRoute element={<HomePage user={user} />} />} />
        <Route path="/notes" element={<PrivateRoute element={<NoteHomePage user={user} />} />} />
        <Route path="/tasks" element={<PrivateRoute element={<TaskHomePage user={user} />} />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
