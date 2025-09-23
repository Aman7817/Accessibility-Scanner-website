// import axios from 'axios';

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
//   withCredentials: true,
// });

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('accessToken');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem('accessToken');
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;



import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1', // <-- changed default to 8000
  // remove withCredentials unless you actually need cookies sent to server
  // withCredentials: true,
});

// helper so you have a single token key
const TOKEN_KEY = 'accessToken';

// Request interceptor
api.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
      // debug log - remove in production
      // console.log('[api] request', config.method, config.url, 'auth?', !!token);
    } catch (err) {
      console.error('[api] request interceptor error', err);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // debug info
    // console.error('[api] response error', error?.response?.status, error?.config?.url);
    if (error?.response?.status === 401) {
      // remove token and optionally notify app
      localStorage.removeItem(TOKEN_KEY);

      // Do NOT directly use window.location.href if you'd like single-page navigation.
      // Instead, we can dispatch a custom event so your app can handle redirect/log out cleanly.
      window.dispatchEvent(new CustomEvent('auth:unauthorized'));
    }
    return Promise.reject(error);
  }
);

export default api;
