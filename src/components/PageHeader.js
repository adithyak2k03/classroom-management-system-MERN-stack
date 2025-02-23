import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faMoon,
  faSun,
  faUser,
  faSignOutAlt,
  faChalkboardTeacher,
} from "@fortawesome/free-solid-svg-icons";
import "../stylesheets/PageHeader.css";
import { UserContext } from "../context/UserContext";

const PageHeader = ({ title }) => {
  const { user } = useContext(UserContext);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    document.body.classList.toggle("dark-mode");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className="page-title">
      <div className="d-flex flex-row align-items-center">
        <Link to="/dashboard" className="logo">
          <FontAwesomeIcon
            className="logo-element"
            icon={faChalkboardTeacher}
          />
        </Link>
        <h4>Hi {user.name}!</h4>
      </div>

      <h1>{title}</h1>

      <button className="profile-menu bg-transparent" onClick={toggleDropdown}>
        <img
          src="/path-to-profile-photo.png"
          alt="Profile"
          className="profile-photo"
          // onClick={toggleDropdown}
        />

        <FontAwesomeIcon
          icon={faChevronDown}
          className="dropdown-icon"
          // onClick={toggleDropdown}
        />

        {isDropdownOpen && (
          <div className="dropdown-menu">
            <Link to="/profile">
              <FontAwesomeIcon icon={faUser} /> Profile
            </Link>

            <button onClick={toggleDarkMode}>
              {isDarkMode ? (
                <>
                  <FontAwesomeIcon icon={faSun} /> Light Mode
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faMoon} /> Dark Mode
                </>
              )}
            </button>

            <button onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </button>
          </div>
        )}
      </button>
    </div>
  );
};

export default PageHeader;
