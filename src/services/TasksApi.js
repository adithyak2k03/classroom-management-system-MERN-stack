const BASE_URL = "http://localhost:5000";

const TASKS_API_URL = `${BASE_URL}/tasks`;

const getValidatedToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found in localStorage");
    return null;
  }
  return token;
};

// Fetch all tasks for the current user
const fetchTasksApi = async () => {
  const token = getValidatedToken();
  if (!token) return null;

  const payload = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(`${TASKS_API_URL}`, payload);
    if (response.ok) {
      return await response.json();
    } else {
      console.error("Failed to Fetch tasks", response.statusText);
      return [];
    }
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

// Add a new task for a specific user
const addTaskApi = async (text) => {
  if (!text.trim()) return null;

  const token = getValidatedToken();
  if (!token) return null;

  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
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

// Toggle task completion for a specific user
const toggleTaskApi = async (id, completed) => {
  const token = getValidatedToken();
  if (!token) return null;

  const payload = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
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

// Edit an existing task for a specific user
const editTaskApi = async (id, newText) => {
  const token = getValidatedToken();
  if (!token) return null;

  const payload = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
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

// Delete a task for a specific user
const deleteTaskApi = async (id) => {
  const token = getValidatedToken();
  if (!token) return null;

  const payload = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await fetch(`${TASKS_API_URL}/${id}`, payload);
    return response.ok;
  } catch (error) {
    console.error("Error deleting task:", error);
    return false;
  }
};

export { fetchTasksApi, addTaskApi, toggleTaskApi, editTaskApi, deleteTaskApi };
