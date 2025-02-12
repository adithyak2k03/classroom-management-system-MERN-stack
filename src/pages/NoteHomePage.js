import React, { useEffect, useState, useContext } from "react";
import "../stylesheets/NotesHomePage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import NoteAddModal from "../components/NoteAddModal";
import NotesGrid from "../components/NotesGrid";
import NoteEditModal from "../components/NoteEditModal";
import NoteDeleteModal from "../components/NoteDeleteModal";

import {
  fetchNotesApi,
  addNoteApi,
  editNoteApi,
  deleteNoteApi,
} from "../services/NotesApi";
import PageHeader from "../components/PageHeader";
import { UserContext } from "../context/UserContext";

const NoteHomePage = () => {
  const { user } = useContext(UserContext);

  const [showAddModal, setShowAddModal] = useState(false);
  const [notes, setNotes] = useState([]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);

  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState("All");

  const fetchNotes = async () => {
    try {
      const data = await fetchNotesApi();

      const sortedNotes = data.sort(
        (a, b) => new Date(b.updatedDate) - new Date(a.updatedDate)
      );

      setNotes(sortedNotes);

      const uniqueTags = ["All", ...new Set(data.map((note) => note.tag))];
      setTags(uniqueTags);
    } catch (error) {
      console.error("Error fetching notes", error);
    }
  };

  const handleAddNote = async (newNote) => {
    try {
      const savedNote = await addNoteApi(newNote);
      setNotes([...notes, savedNote]);

      if (!tags.includes(savedNote.tag)) {
        setTags([...tags, savedNote.tag]);
      }

      setShowAddModal(false);
    } catch (error) {
      console.error("Error adding note", error);
    }
  };

  const handleEditNote = async (updatedNote) => {
    try {
      const savedNote = await editNoteApi(updatedNote);
      // setNotes(
      //     notes.map((note) => (note._id === savedNote._id ? savedNote : note))
      // );
      // const updatedTags = ["All", ...new Set([...notes.map((note) => note.tag), savedNote.tag])];
      // setTags(updatedTags);

      // Update the notes list
      const updatedNotes = notes.map((note) =>
        note._id === savedNote._id ? savedNote : note
      );

      const sortedNotes = updatedNotes.sort(
        (a, b) => new Date(b.updatedDate) - new Date(a.updatedDate)
      );

      setNotes(sortedNotes);

      // setNotes(updatedNotes);

      // Recalculate the tags
      const updatedTags = [
        "All",
        ...new Set(updatedNotes.map((note) => note.tag)),
      ];
      setTags(updatedTags);
    } catch (error) {
      console.error("Error updating note", error);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      const success = await deleteNoteApi(id);

      if (success) {
        // setNotes(notes.filter((note) => note._id !== id));

        const updatedNotes = notes.filter((note) => note._id !== id);
        setNotes(updatedNotes);

        // Update the tags if the note is deleted
        const updatedTags = [
          "All",
          ...new Set(updatedNotes.map((note) => note.tag)),
        ];
        setTags(updatedTags);

        setShowDeleteModal(false);
      }
    } catch (error) {
      console.error("Error deleting note", error);
    }
  };

  const handleDeleteClick = (note) => {
    setNoteToDelete(note);
    setShowDeleteModal(true);
  };

  const handleEditClick = (note) => {
    setCurrentNote(note);
    setShowEditModal(true);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const filteredNotes =
    selectedTag === "All"
      ? notes
      : notes.filter((note) => note.tag === selectedTag);

  return (
    <div>
      <PageHeader title={"Your Notes"} />
      {user && (
        <>
          <div className="actions-container">
            <select
              className="tag-filter"
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
            >
              {tags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
            <button
              className="add-note-btn"
              onClick={() => setShowAddModal(true)}
            >
              <FontAwesomeIcon icon={faPlus} /> Add Note
            </button>
          </div>

          {showAddModal && (
            <NoteAddModal
              user={user}
              onClose={() => setShowAddModal(false)}
              onAddNote={handleAddNote}
            />
          )}

          <NotesGrid
            user={user}
            notes={filteredNotes}
            onEditNote={handleEditClick}
            onDeleteNote={handleDeleteClick}
          />

          {showEditModal && (
            <NoteEditModal
              user={user}
              note={currentNote}
              onClose={() => setShowEditModal(false)}
              onSave={handleEditNote}
            />
          )}

          {showDeleteModal && (
            <NoteDeleteModal
              user={user}
              note={noteToDelete}
              onClose={() => setShowDeleteModal(false)}
              onConfirm={handleDeleteNote}
            />
          )}
        </>
      )}
    </div>
  );
};

export default NoteHomePage;
