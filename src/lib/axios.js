import axios from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'https://minutes-production.up.railway.app';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor to add Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401/403 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      const requestUrl = error.config.url;
      // Ignore 401s from upstream AI/External APIs to prevent auto-logout
      // These should be handled by the specific service calls (e.g. frontendApiService)
      const isExternalApi =
        requestUrl.includes('/api/openai') ||
        requestUrl.includes('/api/gemini') ||
        requestUrl.includes('/api/fireflies');

      if (!isExternalApi) {
        // Clear token and redirect to login only if it's an app-level auth error
        sessionStorage.removeItem('authToken');
        window.dispatchEvent(new Event('auth-error'));
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
