import axios from "axios";
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
});

const refreshToken = async () => {
  try {
    const refreshToken = Cookies.get('refreshToken');
    const response = await axios.post('/user/refresh', {refreshToken});
    const {accessToken, newRefreshToken} = response.data;

    Cookies.set('accessToken', accessToken, {expires: 1});
    Cookies.set('refreshToken', newRefreshToken, {expires: 7});

    return accessToken;
  } catch(error) {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    window.location.href = '/';
    throw error;
  }
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if(
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshToken();
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch(refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error); 
  }
);

export const apiService = {
  get: (url, config = {}) => axiosInstance.get(url, config),
  post: (url, data, config = {}) => axiosInstance.post(url, data, config),
  put: (url, data, config = {}) => axiosInstance.put(url, data, config),
  patch: (url, data, config = {}) => axiosInstance.patch(url, data, config),
  delete: (url, config = {}) => axiosInstance.delete(url, config),
}

export default axiosInstance;