import axios from "axios";

const axiosInstance = axios.create({
  // Aquí puedes configurar las opciones de tu instancia de Axios
  // baseURL: "https://api-urban.onrender.com",
  baseURL: "http://localhost:3000",
});

export default axiosInstance;
