import axios from "axios";

const API = axios.create({
  baseURL: "https://sinkedin-2.onrender.com/api"
});

export default API;