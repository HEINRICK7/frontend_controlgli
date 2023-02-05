import axios from "axios";

const api = axios.create({
  baseURL: "https://dead-erin-gopher-shoe.cyclic.app/",
});

export default api;
