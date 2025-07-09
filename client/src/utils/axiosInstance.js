
import axios from "axios"

const axiosInstance = axios.create({
  baseURL: "https://greenistry-3.onrender.com",
  withCredentials: true,
});

export default axiosInstance