import axios from "axios";

const instance = axios.create({
  baseURL: "https://data.messari.io/api/v1/assets/ethereum",
  headers: {
    "x-messari-api-key": "09e514f4-4312-4cf5-a900-bed7f769b698",
  },
});

export default instance;