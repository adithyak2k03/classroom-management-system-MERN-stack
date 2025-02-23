const BASE_URL = "http://localhost:5000";

const ADMIN_API_URL = `${BASE_URL}/admin/users`;

const getValidatedToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found in localStorage");
    return null;
  }
  return token;
};

const fetchUsersApi = async () => {
  const token = getValidatedToken();
  if (!token) return null;

  const payload = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await fetch(ADMIN_API_URL, payload);

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

const addUserApi = async (newUser) => {
  const token = getValidatedToken();
  if (!token) return null;

  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newUser),
  };

  try {
    const response = await fetch(ADMIN_API_URL, payload);

    if (!response.ok) {
      throw new Error("Failed to add user");
    }
  } catch (error) {
    console.error("Error adding user:", error);
  }
};

const editUserApi = async (updatedUser) => {
  const token = getValidatedToken();
  if (!token) return null;

  const payload = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedUser),
  };

  try {
    const response = await fetch(
      `${ADMIN_API_URL}/${updatedUser._id}`,
      payload
    );

    if (!response.ok) {
      throw new Error("Failed to edit user");
    }
  } catch (error) {
    console.error("Error editing user:", error);
  }
};

const deleteUserApi = async (userId) => {
  const token = getValidatedToken();
  if (!token) return null;

  const payload = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(`${ADMIN_API_URL}/${userId}`, payload);

    if (!response.ok) {
      throw new Error("Failed to delete user");
    }
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

export { fetchUsersApi, addUserApi, editUserApi, deleteUserApi };
