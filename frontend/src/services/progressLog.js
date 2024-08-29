import axios from "axios";
const API_URL = import.meta.env.VITE_APP_API_URL;

export const getUserProgressLogs = async (userId) => {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await axios.get(`${API_URL}/progress-logs`, {
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

export const getProgressLogById = async (id) => {
  const accessToken = localStorage.getItem("accessToken");
  const userId = JSON.parse(localStorage.getItem("user"))._id;

  try {
    const response = await axios.get(`${API_URL}/progress-logs/${id}`, {
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
    return {};
  }
};

export const createProgressLog = async (workoutId, metrics, startTime, endTime) => {
  const accessToken = localStorage.getItem("accessToken");
  const userId = JSON.parse(localStorage.getItem("user"))._id;

  console.log(startTime, endTime);

  try {
    const response = await axios.post(
      `${API_URL}/progress-logs`,
      {
        userId,
        workoutId,
        metrics,
        startTime,
        endTime,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
};

export const updateProgressLog = async (id, workoutId, metrics, startTime, endTime) => {
  const accessToken = localStorage.getItem("accessToken");
  const userId = JSON.parse(localStorage.getItem("user"))._id;

  try {
    const response = await axios.patch(
      `${API_URL}/progress-logs`,
      {
        id,
        userId,
        workoutId,
        metrics,
        startTime,
        endTime,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
};

export const deleteProgressLog = async (id) => {
  const accessToken = localStorage.getItem("accessToken");
  const userId = JSON.parse(localStorage.getItem("user"))._id;

  try {
    const response = await axios.delete(`${API_URL}/progress-logs`, {
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
