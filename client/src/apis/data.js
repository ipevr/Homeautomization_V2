import axios from "axios";

const data = axios.create({
  url: "http://localhost:5000/",
  //url: "http://192.168.188.21:5000/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default data;
