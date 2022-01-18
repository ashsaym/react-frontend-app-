import axios from "axios";
import { setupInterceptorsTo } from "./interceptors";
import configData from '../config';


const api = setupInterceptorsTo(
  axios.create({
    baseURL: configData.API_SERVER,
    headers: {
      "Content-Type": "application/json",
    },
  })
);

export default api;