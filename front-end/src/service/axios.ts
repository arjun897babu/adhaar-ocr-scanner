import Axios from "axios";
const { VITE_API_URI } = import.meta.env;

export const server = Axios.create({
  baseURL: VITE_API_URI,
  headers: { "Content-Type": "multipart/form-data" },
});
