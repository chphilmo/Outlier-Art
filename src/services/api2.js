import axios from "axios";

const instance = axios.create({
  baseURL: "https://headless.philmo.ch/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;