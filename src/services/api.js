import axios from "axios";

require('dotenv').config();
const API_KEY = process.env.MESSARI_API_KEY;

const instance = axios.create({
  baseURL: "https://data.messari.io/api/v1/assets/ethereum",
  headers: {
    "x-messari-api-key": API_KEY,
  },
});

export default instance;