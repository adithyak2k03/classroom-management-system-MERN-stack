import React, { useState } from "react";
import {faTimes} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../stylesheets/NotesAddModal.css"

const NoteAddModal = ( {onClose, onAddNote} ) => {

    const [note, setNote] = useState({
        title: "",
        description: "",
        tag: "",
    });

    const handleChange = (e) =>{
        setNote({...note, [e.target.name]: e.target.value});
    };

    const handleAddNote = () =>{
        if(!note.title || !note.description){
            alert("Title and Description are required!");
            return;
        }
        onAddNote(note);
    }

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        return <p>Please log in to view tasks.</p>; // Display a login prompt if no user is logged in
    }
    
    return(
        <div className="modal-overlay" onClick={()=> onClose()}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <FontAwesomeIcon
                    icon={faTimes}
                    className="close-icon"
                    onClick={onClose}
                />
                <h2> Add a Note</h2>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={note.title}
                    onChange={handleChange}
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={note.description}
                    onChange={handleChange}
                ></textarea>
                <input
                    type="text"
                    name="tag"
                    placeholder="Tag"
                    value={note.tag}
                    onChange={handleChange}
                />
                <button className="add-btn" onClick={handleAddNote}>
                    Add Note
                </button>
            </div>
        </div>
    );
};

export default NoteAddModal;