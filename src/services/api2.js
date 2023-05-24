require('dotenv').config();
import axios from "axios";

const API_URL = process.env.VUE_APP_API_URL;

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;