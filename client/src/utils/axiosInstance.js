
import axios from "axios"

const axiosInstance = axios.create({
  baseURL: "https://greenistry-2.onrender.com",
  withCredentials: true,
});

export default axiosInstance