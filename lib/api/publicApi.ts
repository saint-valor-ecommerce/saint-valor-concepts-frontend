import axios from "axios";

const publicApi = axios.create({
  baseURL: "https://saint-valor-backend.onrender.com",
  headers: { "Content-Type": "application/json" },
});

export default publicApi;
