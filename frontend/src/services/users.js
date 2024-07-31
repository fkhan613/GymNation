import axios from "axios";
import { process } from "node";
const API_URL = process.env.API_URL;

const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    return response.data.token;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to login");
  }
};

const fetchProtectedData = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`${API_URL}/protected`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch protected data"
    );
  }
};

export default {
  login,
  fetchProtectedData,
};
