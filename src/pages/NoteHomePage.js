import React, { useEffect, useState } from "react";
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

const NoteHomePage = (props) => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [notes, setNotes] = useState([]);

    const [showEditModal, setShowEditModal] = useState(false);
    const [currentNote, setCurrentNote] = useState(null);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [noteToDelete, setNoteToDelete] = useState(null);
    
    const [tags, setTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState("All");

    // Get the logged-in user from localStorage
    const user = JSON.parse(localStorage.getItem("user"));

    const fetchNotes = async () => {
        try {
            const data = await fetchNotesApi();
            setNotes(data);

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
            setNotes(updatedNotes);

            // Recalculate the tags
            const updatedTags = ["All", ...new Set(updatedNotes.map((note) => note.tag))];
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
                const updatedTags = ["All", ...new Set(updatedNotes.map((note) => note.tag))];
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

    const filteredNotes = selectedTag === "All" ? notes : notes.filter(note => note.tag === selectedTag);

    return (
        <div>
            <div className="page-title">
                <h1>Your Note Book</h1>
                {user ? (
                    <p>Welcome, {user.name}!</p> // Display user's name
                ) : (
                    <p>You are not logged in. Please log in first.</p>
                )}
            </div>

            {user && (
                <>
                    <select
                        className="tag-filter"
                        value={selectedTag}
                        onChange={(e) => setSelectedTag(e.target.value)}
                    >
                        {tags.map(tag => (
                            <option key={tag} value={tag}>
                                {tag}
                            </option>
                        ))}
                    </select>
                    <button className="add-note-btn" onClick={() => setShowAddModal(true)}>
                        <FontAwesomeIcon icon={faPlus} /> Add Note
                    </button>

                    {showAddModal && (
                        <NoteAddModal
                            onClose={() => setShowAddModal(false)}
                            onAddNote={handleAddNote}
                        />
                    )}

                    <NotesGrid
                        notes={filteredNotes}
                        onEditNote={handleEditClick}
                        onDeleteNote={handleDeleteClick}
                    />

                    {showEditModal && (
                        <NoteEditModal
                            note={currentNote}
                            onClose={() => setShowEditModal(false)}
                            onSave={handleEditNote}
                        />
                    )}

                    {showDeleteModal && (
                        <NoteDeleteModal
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
