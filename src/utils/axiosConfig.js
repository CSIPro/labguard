import Axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;

const instance = Axios.create({
  timeout: 15000,
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "POST,GET,DELETE,PUT,OPTIONS",
  },
});

// instance.interceptors.request.use(
//   async (config) => {
//     const token = await getToken();

//     if (token) {
//       config.headers.Authorization = ` Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

instance.interceptors.response.use(
  async (response) => {
    if (response.headers["content-type"].indexOf("application/json") !== -1) {
      return response.data;
    }
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.data.type) {
        const errorMessage = error.response.data.message;
        return Promise.reject(errorMessage);
      }
      return Promise.reject(error.response.data);
    } else if (error.request) {
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default instance;
