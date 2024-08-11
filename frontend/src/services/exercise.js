import axios from "axios";
const RAPID_API_KEY = import.meta.env.VITE_RAPID_API_KEY;
const RAPID_API_HOST = import.meta.env.VITE_RAPID_API_HOST;

export const fetchExercises = async (page = 1, limitV = 50) => {
  const limit = limitV;
  const offset = (page - 1) * limit;

  const options = {
    method: "GET",
    url: "https://exercisedb.p.rapidapi.com/exercises",
    params: {
      limit: limit.toString(),
      offset: offset.toString(),
    },
    headers: {
      "x-rapidapi-key": RAPID_API_KEY,
      "x-rapidapi-host": RAPID_API_HOST,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchExerciseByName = async (name, page = 1, limitV = 50) => {
  const parsedSearch = name.replace(" ", "%20");
  const limit = limitV;
  const offset = (page - 1) * limit;

  const options = {
    method: "GET",
    url: "https://exercisedb.p.rapidapi.com/exercises/name/" + parsedSearch,
    params: {
      limit: limit.toString(),
      offset: offset.toString(),
    },
    headers: {
      "x-rapidapi-key": RAPID_API_KEY,
      "x-rapidapi-host": RAPID_API_HOST,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchExerciseById = async (id) => {
  const options = {
    method: "GET",
    url: "https://exercisedb.p.rapidapi.com/exercises/exercise/" + id,
    headers: {
      "x-rapidapi-key": RAPID_API_KEY,
      "x-rapidapi-host": RAPID_API_HOST,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchExerciseByBodyPart = async (bodyPart, page=1, limitV=50) => {
  const parsedSearch = bodyPart.replace(" ", "%20");
  const limit = limitV;
  const offset = (page - 1) * limit;

  const options = {
    method: "GET",
    url: "https://exercisedb.p.rapidapi.com/exercises/bodyPart/" + parsedSearch,
    params: {
      limit: limit.toString(),
      offset: offset.toString(),
    },
    headers: {
      "x-rapidapi-key": RAPID_API_KEY,
      "x-rapidapi-host": RAPID_API_HOST,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchExerciseByEquipment = async (equipment, page = 1, limitV = 50) => {
  const parsedSearch = equipment.replace(" ", "%20");
  const limit = limitV;
  const offset = (page - 1) * limit;

  const options = {
    method: "GET",
    url:
      "https://exercisedb.p.rapidapi.com/exercises/equipment/" + parsedSearch,
    params: {
      limit: limit.toString(),
      offset: offset.toString(),
    },
    headers: {
      "x-rapidapi-key": RAPID_API_KEY,
      "x-rapidapi-host": RAPID_API_HOST,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchExerciseByTargetMuscle = async (
  targetMuscle,
  page = 1,
  limitV = 50
) => {
  const parsedSearch = targetMuscle.replace(" ", "%20");
  const limit = limitV;
  const offset = (page - 1) * limit;

  const options = {
    method: "GET",
    url: "https://exercisedb.p.rapidapi.com/exercises/target/" + parsedSearch,
    params: {
      limit: limit.toString(),
      offset: offset.toString(),
    },
    headers: {
      "x-rapidapi-key": RAPID_API_KEY,
      "x-rapidapi-host": RAPID_API_HOST,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
