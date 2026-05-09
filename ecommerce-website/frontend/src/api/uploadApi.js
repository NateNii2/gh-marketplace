import axios from "axios";

const UPLOAD_API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const uploadImage = async (file, token) => {
  const formData = new FormData();
  formData.append("image", file);

  const { data } = await UPLOAD_API.post("/upload", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return data.url;
};
