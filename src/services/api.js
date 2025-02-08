const API_URL = "http://localhost:5000";

const loginUserApi = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    return await response.json();
  } catch (error) {
    console.error("Login API error:", error);
    throw new Error("Something went wrong during login.");
  }
};

const signupUserApi = async (name, email, password) => {
  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    return await response.json();
  } catch (error) {
    console.error("Signup API error:", error);
    throw new Error("Something went wrong during signup.");
  }
};


export {
    loginUserApi,
    signupUserApi
};
