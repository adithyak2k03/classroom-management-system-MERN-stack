import React, { useState } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../stylesheets/NotesModals.css";

const NoteAddModal = ({ user, onClose, onAddNote }) => {
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleAddNote = () => {
    if (!note.title || !note.description) {
      alert("Title and Description are required!");
      return;
    }
    onAddNote(note);
  };

  if (!user) {
    return <p>Please log in to view tasks.</p>;
  }

  return (
    <div className="modal-overlay" onClick={() => onClose()}>
      <div className="notes modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          <FontAwesomeIcon
            icon={faTimes}
            className="close-icon"
            onClick={onClose}
          />
        </button>

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
