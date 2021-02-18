import axios from "axios";

const plugs = axios.create({
  baseURL: "http://localhost:3001",
});

export default plugs;
