import axios from "axios";

const api = axios.create({
  baseURL: "https://dead-erin-gopher-shoe.cyclic.app/",
  //baseURL: "http://localhost:3333/",
});

export default api;
