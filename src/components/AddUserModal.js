import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const AddUserModal = ({ onClose, onSave }) => {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "student",
    password: "",
  });

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(newUser);
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("add-user-modal")) {
      onClose();
    }
  };

  return (
    <div className="add-user-modal" onClick={handleOverlayClick}>
      <div className="add-user-modal-content">
        <FontAwesomeIcon
          icon={faTimes}
          className="close-icon"
          onClick={onClose}
        />
        <h2>Add New User</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <select name="role" onChange={handleChange}>
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button type="submit">Add User</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
