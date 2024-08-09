import axios from "axios";
const API_URL = import.meta.env.VITE_APP_API_URL;

export const getUserWorkouts = async (userId) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(`${API_URL}/workouts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      userId,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getWorkoutById = async (id, userId) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(`${API_URL}/workouts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      userId,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
};

export const createWorkout = async (userId, name, description, exercises) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(`${API_URL}/workouts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

export const updateWorkoutById = async (
  id,
  userId,
  name,
  description,
  exercises
) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.patch(`${API_URL}/workouts/`, {
      headers: {
        Authorization: `Bearer ${token}`,
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
  const token = localStorage.getItem("token");

  try {
    const response = await axios.delete(`${API_URL}/workouts`, {
      headers: {
        Authorization: `Bearer ${token}`,
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
