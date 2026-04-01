import axios from "axios";

const publicApi = axios.create({
  baseURL: "https://backend-qh97.onrender.com/api/v1",
  headers: { "Content-Type": "application/json" },
});

export default publicApi;
