import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const EditUserModal = ({ user, onClose, onSave }) => {
  const [updatedUser, setUpdatedUser] = useState({ ...user });

  useEffect(() => {
    setUpdatedUser({ ...user });
  }, [user]);

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(updatedUser); // Sending the correct user object
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("edit-user-modal")) {
      onClose();
    }
  };

  return (
    <div className="edit-user-modal" onClick={handleOverlayClick}>
      <div className="edit-user-modal-content">
        <FontAwesomeIcon
          icon={faTimes}
          className="close-icon"
          onClick={onClose}
        />
        <h2>Edit User</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={updatedUser.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            value={updatedUser.email}
            onChange={handleChange}
            required
          />
          <select name="role" value={updatedUser.role} onChange={handleChange}>
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit">Save Changes</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
