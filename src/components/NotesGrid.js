import React, { useState } from "react";
import { faTimes, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../stylesheets/NotesGrid.css";

const NotesGrid = ({ user, notes, onEditNote, onDeleteNote }) => {
  const [selectedNote, setSelectedNote] = useState(null);

  const [copySuccess, setCopySuccess] = useState(false);

  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  if (!user) {
    return <p>Please log in to view notes.</p>;
  }

  return (
    <>
      <div className="notes-grid">
        {notes.map((note) => (
          <div
            key={note._id}
            className="note-card"
            onClick={(e) => {
              if (e.target.tagName !== "BUTTON") {
                setSelectedNote(note);
              }
            }}
          >
            <h4 className="card-title">{truncateText(note.title, 15)}</h4>
            {/* <p className="text-wrap">{truncateText(note.description, 70)}</p> */}
            <p className="card-text">{truncateText(note.description, 50)}</p>

            <span className="card-tag">{note.tag}</span>

            <small>
              Created: {new Date(note.createdDate).toLocaleString()}
            </small>

            <small>
              Updated: {new Date(note.updatedDate).toLocaleString()}
            </small>
            <hr />

            <div className="card-footer">
              <button
                className="btn btn-warning"
                onClick={() => onEditNote(note)}
              >
                Edit
              </button>

              <button
                className="btn btn-danger"
                onClick={() => onDeleteNote(note)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedNote && (
        <div className="modal-overlay" onClick={() => setSelectedNote(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedNote(null)}>
              <FontAwesomeIcon icon={faTimes} className="close-icon" />
            </button>
            <div className="modal-header-with-copy">
              <h3>{selectedNote.title}</h3>
              {copySuccess && <span className="copy-toast">Copied!</span>}
              <FontAwesomeIcon
                icon={faCopy}
                className="copy-icon"
                onClick={() => {
                  const textToCopy = `Title: ${selectedNote.title}\n\nDescription:\n${selectedNote.description}\n\nTag: ${selectedNote.tag}`;
                  navigator.clipboard.writeText(textToCopy);
                  setCopySuccess(true);
                  setTimeout(() => setCopySuccess(false), 1500);
                }}
                title="Copy Note"
              />
            </div>

            <p style={{ whiteSpace: "pre-wrap" }}>{selectedNote.description}</p>
            <span>{selectedNote.tag}</span>
            <hr />
            <br />
            <small>Created: {selectedNote.createdDate}</small>
            <br />
            <small>Updated: {selectedNote.updatedDate}</small>
          </div>
        </div>
      )}
    </>
  );
};

export default NotesGrid;
