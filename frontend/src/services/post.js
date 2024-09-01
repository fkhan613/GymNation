import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;

// Get all posts
export const getAllPosts = async (page = 1, limit = 50) => {
  try {
    const response = await axios.get(`${API_URL}/posts`, {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

// Get post by ID
export const getPostById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    throw error;
  }
};

// Create new post
export const createNewPost = async (userId, caption, image, tags) => {
  try {
    const response = await axios.post(`${API_URL}/posts`, {
      userId,
      caption,
      image,
      tags,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating new post:", error);
    throw error;
  }
};

// Update post by ID
export const updatePostById = async (id, userId, caption, image, tags) => {
  try {
    const response = await axios.patch(`${API_URL}/posts`, {
      id,
      userId,
      caption,
      image,
      tags,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};

// Delete post by ID
export const deletePostById = async (id, userId) => {
  try {
    const response = await axios.delete(`${API_URL}/posts`, {
      data: { id, userId },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};
