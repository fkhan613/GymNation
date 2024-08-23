import axios from "axios";
const API_URL = import.meta.env.VITE_APP_API_URL;

export const getUserWorkouts = async (userId) => {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await axios.get(`${API_URL}/workouts`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        userId,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getWorkoutById = async (id) => {
  const accessToken = localStorage.getItem("accessToken");
  const userId = JSON.parse(localStorage.getItem("user"))._id;

  try {
    const response = await axios.get(`${API_URL}/workouts/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        userId,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching workout by ID:", error);
    return {};
  }
};

export const getExercisesByWorkout = async (id) => {
  const userId = JSON.parse(localStorage.getItem("user"))._id;
  const accessToken = localStorage.getItem("accessToken");

  console.log("Workout ID:", id, "User ID:", userId);

  try {
    const response = await axios.get(`${API_URL}/workouts/${id}/exercises/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching workout exercises:",
      error.response || error.message
    );
    return [];
  }
};

export const createWorkout = async (
  userId,
  name,
  description,
  exercises,
  visibility,
  coverPhoto
) => {
  const accessToken = localStorage.getItem("accessToken");

  console.log("Cover photo in service:", coverPhoto);

  try {
    const response = await axios.post(
      `${API_URL}/workouts`,
      {
        // Correctly place userId, name, description, and exercises in the request body
        userId,
        name,
        description,
        exercises,
        visibility,
        coverPhoto,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating workout:", error);
    return null;
  }
};

export const updateWorkoutById = async (
  id,
  userId,
  name,
  description,
  exercises,
  visibility,
  coverPhoto
) => {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await axios.patch(
      `${API_URL}/workouts`,
      {
        id,
        userId,
        name,
        description,
        exercises,
        visibility,
        coverPhoto,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating workout:", error.response || error.message);
    return {};
  }
};

export const updateWorkoutExercisesById = async (id, exercises) => {
  const accessToken = localStorage.getItem("accessToken");
  const userId = JSON.parse(localStorage.getItem("user"))._id;

  try {
    const response = await axios.patch(
      `${API_URL}/workouts/update-workout-exercises`,
      {
        id,
        userId,
        exercises,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error updating workout exercises:",
      error.response || error.message
    );
    return {};
  }
};

export const deleteWorkoutById = async (id, userId) => {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await axios.delete(`${API_URL}/workouts`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        id,
        userId,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
};

export const uploadWorkoutCoverPhoto = async (coverPhoto) => {
  const formData = new FormData();
  formData.append("image", coverPhoto);

  try {
    console.log("Uploading cover photo:", coverPhoto);
    const response = await axios.post(`${API_URL}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Upload response:", response.data);
    return response.data.fileUrl;
  } catch (error) {
    console.error(
      "Error uploading cover photo:",
      error.response ? error.response.data : error.message
    );
    return null;
  }
};

export default uploadWorkoutCoverPhoto;
