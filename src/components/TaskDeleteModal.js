import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const TaskDeleteModal = ({ user, task, isOpen, onClose, onDelete }) =>{

    if(!isOpen) return null;

    const handleDelete = () => {
        onDelete(task._id);
        onClose();
    };

    if (!user) {
        return <p>Please log in to view tasks.</p>;
    }
    return(

        <div className="modal-overlay">
            <div className="modal-content">
                <button  className="close-btn" onClick={onClose} >
                    <FontAwesomeIcon icon={faTimes}/>
                </button>
                <h2>Are you sure you want to delete this task?</h2>
                <p>{task?.text}</p>
                <div>
                    <button className="btn btn-primary" onClick={handleDelete}>Delete</button>
                    <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default TaskDeleteModal;