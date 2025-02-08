const BASE_URL = "http://localhost:5000";

const NOTES_API_URL = `${BASE_URL}/notes`;

const getValidatedToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        console.error("No token found in localStorage");
        return null;
    }
    return token;
};

// Fetch all notes for the current user
const fetchNotesApi = async () => {

    const token = getValidatedToken();
    if (!token) return null;

    const payload = {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    };
    
    try {
        const response = await fetch(`${NOTES_API_URL}`, payload);
        if(response.ok){
            return await response.json();
        } else{
            console.error("Failed to fetch notes", response.statusText);
            return []; 
        }
    } catch (error) {
        console.error("Error fetching notes", error);
        throw error;
    }
};

// Add a new note for a specific user
const addNoteApi = async (newNote) => {

    const token = getValidatedToken();
    if (!token) return null;

    const payload = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify( newNote ),
    };

    try {
        const response = await fetch(NOTES_API_URL, payload);
        if (response.ok) {
            return await response.json();
        } else {
            console.error("Failed to add note");
            throw new Error("Failed to add note");
        }
    } catch (error) {
        console.error("Error adding note", error);
        throw error;
    }
};

// Edit an existing note for a specific user
const editNoteApi = async (updatedNote) => {
    
    const token = getValidatedToken();
    if (!token) return null;

    const payload = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify( updatedNote ),
    };

    try {
        const response = await fetch(`${NOTES_API_URL}/${updatedNote._id}`, payload);
        if (response.ok) {
            return await response.json();
        } else {
            console.error("Failed to update note");
            throw new Error("Failed to update note");
        }
    } catch (error) {
        console.error("Error updating note", error);
        throw error;
    }
};

// Delete a note for a specific user
const deleteNoteApi = async (id) => {

    const token = getValidatedToken();
    if (!token) return null;

    const payload = {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    };

    try {
        const response = await fetch(`${NOTES_API_URL}/${id}`, payload);
        if (response.ok) {
            return true;
        } else {
            console.error("Failed to delete note");
            throw new Error("Failed to delete note");
        }
    } catch (error) {
        console.error("Error deleting note", error);
        throw error;
    }
};


export {
    fetchNotesApi,
    addNoteApi,
    editNoteApi,
    deleteNoteApi,
};
