import axios from 'axios';
import stringifyQuery from 'src/utils/parsers/queryString';

const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });
// Format nested params correctly
axiosInstance.interceptors.request.use((config) => {
  config.paramsSerializer = (params) => stringifyQuery(params);

  return config;
});
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(new Error(`Requisição rejeitada: ${JSON.stringify(error)}`))
);

export default axiosInstance;
