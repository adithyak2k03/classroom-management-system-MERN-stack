// Common API URL for the combined system
// const BASE_URL = "http://localhost:5000";

// **User API Endpoints**
// const USER_API_URL = `${BASE_URL}/user`;

// **Authentication API Endpoints**
// const AUTH_API_URL = `${BASE_URL}/auth`;

// // User login
// const loginApi = async (email, password) => {
//     const payload = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//     };

//     try {
//         const response = await fetch(`${AUTH_API_URL}/login`, payload);
//         if (response.ok) {
//             return await response.json();
//         } else {
//             console.error("Failed to login");
//             throw new Error("Failed to login");
//         }
//     } catch (error) {
//         console.error("Error logging in", error);
//         throw error;
//     }
// };

// // User signup
// const signupApi = async (userData) => {
//     const payload = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(userData),
//     };

//     try {
//         const response = await fetch(`${AUTH_API_URL}/signup`, payload);
//         if (response.ok) {
//             return await response.json();
//         } else {
//             console.error("Failed to sign up");
//             throw new Error("Failed to sign up");
//         }
//     } catch (error) {
//         console.error("Error signing up", error);
//         throw error;
//     }
// };

export {
    // loginApi,
    // signupApi,
};
