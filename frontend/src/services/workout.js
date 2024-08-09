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

export const getWorkoutById = async (id, userId) => {
  const accessToken = localStorage.getItem("accessToken");

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

export const createWorkout = async (userId, name, description, exercises) => {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await axios.post(
      `${API_URL}/workouts`,
      { // Correctly place userId, name, description, and exercises in the request body
        userId,
        name,
        description,
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
    console.error("Error creating workout:", error);
    return null;
  }
};

export const updateWorkoutById = async (
  id,
  userId,
  name,
  description,
  exercises
) => {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await axios.patch(`${API_URL}/workouts/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      id,
      userId,
      name,
      description,
      exercises,
    });
    return response.data;
  } catch (error) {
    console.error(error);
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
      id,
      userId,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
};
