import axios from "axios";
const API_URL = "http://localhost:3500";

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to login");
  }
};

export const register = async (firstName, lastName, email, password, username) => {
  try {
    const response = await axios.post(`${API_URL}/users`, {
      firstName,
      lastName,
      email,
      password,
      username,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to register");
  } 
}

// export const fetchProtectedData = async () => {
//   const token = localStorage.getItem("token");
//   try {
//     const response = await axios.get(`${API_URL}/protected`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     throw new Error(
//       error.response?.data?.message || "Failed to fetch protected data"
//     );
//   }
// };
