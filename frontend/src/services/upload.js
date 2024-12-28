import axios from "axios";
const API_URL = import.meta.env.VITE_APP_API_URL;

export const uploadPhoto = async (photo) => {
  const formData = new FormData();
  formData.append("image", photo);

  try {
    const response = await axios.post(`${API_URL}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.fileUrl;
  } catch (error) {
    console.error(
      "Error uploading  photo:",
      error.response ? error.response.data : error.message
    );
    return null;
  }
};
