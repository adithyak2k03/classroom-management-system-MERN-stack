// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NoteHomePage from './pages/NoteHomePage';
import TaskHomePage from './pages/TaskHomePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/notes" element={<NoteHomePage />} />
        <Route path="/tasks" element={<TaskHomePage />} />
        {/* Add Admin and Profile pages here if needed */}
      </Routes>
    </Router>
  );
};

export default App;
