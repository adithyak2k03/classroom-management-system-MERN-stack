import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const DeleteUserModal = ({ user, onClose, onConfirm }) => {
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("delete-user-modal")) {
      onClose();
    }
  };

  return (
    <div className="delete-user-modal" onClick={handleOverlayClick}>
      <div className="delete-user-modal-content">
        <FontAwesomeIcon
          icon={faTimes}
          className="close-icon"
          onClick={onClose}
        />
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete {user.name}?</p>
        <button onClick={() => onConfirm(user._id)}>Confirm</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default DeleteUserModal;
