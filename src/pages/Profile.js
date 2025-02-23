import React, { useEffect, useState } from "react";
import "../stylesheets/ProfilePage.css";
import PageHeader from "../components/PageHeader";
import { Link } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(`${BASE_URL}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }

        const data = await response.json();
        setProfile(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(err.message);
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!profile) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile-page">
      <PageHeader title={"Profile"} />

      {/* Profile Content */}
      <div className="profile-container">
        <h1>Profile</h1>
        <p>
          <strong>Name:</strong> {profile.name}
        </p>
        <p>
          <strong>Email:</strong> {profile.email}
        </p>
        <p>
          <strong>Role:</strong> {profile.role}
        </p>
        <p>
          <strong>Account Created:</strong>{" "}
          {new Date(profile.createdAt).toLocaleDateString()}
        </p>
        <p>
          <strong>Number of Notes:</strong> {profile.noteCount}
        </p>
        <p>
          <strong>Number of Tasks:</strong> {profile.taskCount}
        </p>
        {profile.role === "admin" && (
          <div className="admin-section">
            <Link to="/admin-users" className="admin-button">
              Manage Users
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
