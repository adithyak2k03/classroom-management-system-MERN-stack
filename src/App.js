import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DashboardPage from "./pages/DashboardPage";
import NoteHomePage from "./pages/NoteHomePage";
import TaskHomePage from "./pages/TaskHomePage";
import Profile from "./pages/Profile";
import HomePage from "./pages/HomePage";
import AdminUsersPage from "./pages/AdminUsersPage";
import { UserContext } from "./context/UserContext";

const App = () => {
  const { user, loading } = useContext(UserContext);

  const PrivateRoute = ({ element, adminOnly = false }) => {
    // Redirect to login if no user is found (not logged in)
    if (loading) {
      return <div>Loading...</div>; // Optional: Add a better loading UI
    }
    if (!user) {
      return <Navigate to="/" />;
    }
    if (adminOnly && user.role !== "admin") {
      return <Navigate to="/dashboard" />; // Redirect non-admins
    }
    return element;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/admin-users"
          element={
            <PrivateRoute element={<AdminUsersPage />} adminOnly={true} />
          }
        />
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<DashboardPage />} />}
        />
        <Route
          path="/profile"
          element={<PrivateRoute element={<Profile />} />}
        />
        <Route
          path="/notes"
          element={<PrivateRoute element={<NoteHomePage />} />}
        />
        <Route
          path="/tasks"
          element={<PrivateRoute element={<TaskHomePage />} />}
        />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
