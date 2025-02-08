import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const NoteDeleteModal = ({ note, onClose, onConfirm }) => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        return <p>Please log in to view tasks.</p>; // Display a login prompt if no user is logged in
    }
    
    return (
        <div className="modal-overlay" onClick={()=> onClose()}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <h2>Delete Note</h2>
                <p>Are you sure you want to delete <strong>"{note.title}"</strong>?</p>
                <div className="modal-actions">
                    <button className="btn btn-danger" onClick={() => onConfirm(note._id)}>Confirm</button>
                    <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default NoteDeleteModal;
