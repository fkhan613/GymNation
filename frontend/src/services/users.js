import axios from "axios";
const API_URL = import.meta.env.VITE_APP_API_URL;

export const login = async (email, password, rememberMe) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
      rememberMe,
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

export const getUserProfile = async (userId) => {

  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await axios.get(`${API_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params:{
        userId: userId,
      } 
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch user profile"
    );
  }
};

export const getUserPosts = async (userId) => {

  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await axios.get(`${API_URL}/posts/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch user posts"
    );
  }
};

export const getUserFollowers = async (userId) => {

  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await axios.get(`${API_URL}/users/${userId}/followers`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch user followers"
    );
  }
};

export const getUserFollowing = async (userId) => {

  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await axios.get(`${API_URL}/users/${userId}/following`, {
      headers: {
        Authorization: `Bearer ${accessToken
        }`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch user following"
    );
  }
};

export const updateUserProfilePicture = async (userId, pfpUrl) => {
  const accessToken = localStorage.getItem("accessToken");

  try {
    // Send a PATCH request to update the user's profile picture
    const response = await axios.patch(
      `${API_URL}/users/${userId}/profilePicture`,
      {
        pfp: pfpUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update profile picture"
    );
  }
};

