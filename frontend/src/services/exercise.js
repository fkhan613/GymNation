import axios from "axios";
const RAPID_API_KEY = import.meta.env.VITE_RAPID_API_KEY;
const RAPID_API_HOST = import.meta.env.VITE_RAPID_API_HOST;

export const fetchExercises = async (page) => {
  const limit = 50;
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
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

export const fetchExerciseByName = async (name, page) => {
  const parsedSearch = name.replace(" ", "%20");
  const limit = 50;
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

export const fetchBodyParts = async () => {
  const options = {
    method: "GET",
    url: "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
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

export const fetchExerciseByBodyPart = async (bodyPart, page) => {
  const parsedSearch = bodyPart.replace(" ", "%20");
  const limit = 50;
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

export const fetchEquipment = async () => {
  const options = {
    method: "GET",
    url: "https://exercisedb.p.rapidapi.com/exercises/equipmentList",
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

export const fetchExerciseByEquipment = async (equipment, page) => {
  const parsedSearch = equipment.replace(" ", "%20");
  const limit = 50;
  const offset = (page - 1) * limit;

  const options = {
    method: "GET",
    url:
      "https://exercisedb.p.rapidapi.com/exercises/equipment/" + parsedSearch,
    params: {
      limit: limit.toString(),
      offset: offset.toString,
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

export const fetchTargetMuscles = async () => {
  const options = {
    method: "GET",
    url: "https://exercisedb.p.rapidapi.com/exercises/targetList",
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

export const fetchExerciseByTargetMuscle = async (targetMuscle, page) => {
  const parsedSearch = targetMuscle.replace(" ", "%20");
  const limit = 50;
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
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
