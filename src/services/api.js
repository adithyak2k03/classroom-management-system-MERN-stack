// Common API URL for the combined system
const BASE_URL = "http://localhost:5000";

// **Notes API Endpoints**
const NOTES_API_URL = `${BASE_URL}/notes`;

// **Tasks API Endpoints**
const TASKS_API_URL = `${BASE_URL}/tasks`;

const fetchNotesApi = async () => {
    try {
        const response = await fetch(NOTES_API_URL);
        return await response.json();
    } catch (error) {
        console.error("Error fetching notes", error);
        throw error;
    }
};

const addNoteApi = async (newNote) => {
    const payload = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newNote),
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

const editNoteApi = async (updatedNote) => {
    const payload = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedNote),
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

const deleteNoteApi = async (id) => {
    const payload = {
        method: "DELETE",
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

const fetchTasks = async () => {
    try {
      const response = await fetch(TASKS_API_URL);
      return await response.json();
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return [];
    }
};

const addTask = async (text) => {
    if (!text.trim()) return null;

    const payload = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
    };

    try {
        const response = await fetch(TASKS_API_URL, payload);
        return response.ok ? await response.json() : null;
    } catch (error) {
        console.error("Error adding task:", error);
        return null;
    }
};

const toggleTask = async (id, completed) => {
    const payload = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    };
  
    try {
      const response = await fetch(`${TASKS_API_URL}/${id}`, payload);
      return response.ok ? await response.json() : null;
    } catch (error) {
      console.error("Error toggling task:", error);
      return null;
    }
};

const editTask = async (id, newText) => {
    const payload = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newText }),
    };
  
    try {
      const response = await fetch(`${TASKS_API_URL}/${id}`, payload);
      return response.ok ? await response.json() : null;
    } catch (error) {
      console.error("Error editing task:", error);
      return null;
    }
};

const deleteTask = async (id) => {
    try {
      const response = await fetch(`${TASKS_API_URL}/${id}`, { method: "DELETE" });
      return response.ok;
    } catch (error) {
      console.error("Error deleting task:", error);
      return false;
    }
};

export { 
  fetchNotesApi, addNoteApi, editNoteApi, deleteNoteApi, 
  fetchTasks, addTask, toggleTask, editTask, deleteTask 
};
