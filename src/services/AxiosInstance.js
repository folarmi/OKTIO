import axios from "axios";
import { store } from "../store/store";

const axiosInstance = axios.create({
  // baseURL: `http://localhost:3000/`,
  baseURL: `http://3.109.81.144:3000`,
});

axiosInstance.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth.auth.token;
  config.params = config.params || {};
  config.headers["x-auth-token"] = token;
  return config;
});

export default axiosInstance;
