import axios from "axios";

const plugs = axios.create({
  url: "http://localhost:5000/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default plugs;
