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
      const requestUrl = error.config?.url || '';

      // Determine if this is an external AI API call via our proxy
      // These paths match the backend proxy routes
      const isExternalApi =
        requestUrl.includes('/api/openai') ||
        requestUrl.includes('/api/gemini') ||
        requestUrl.includes('/api/fireflies');

      // Debugging for production issues
      if (isExternalApi) {
        console.warn(`[Axios] Ignored ${error.response.status} from External API: ${requestUrl}. No logout triggered.`);
        return Promise.reject(error);
      }

      // If we are here, it's a legitimate application-level auth error (e.g., token expired)
      console.warn(`[Axios] Auth Error ${error.response.status} on ${requestUrl}. Triggering logout.`);

      sessionStorage.removeItem('authToken');
      window.dispatchEvent(new Event('auth-error'));
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
