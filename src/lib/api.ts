import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:4000", // Backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Optional: Auto-logout on 401
      if (typeof window !== "undefined") {
        localStorage.removeItem("access_token");
        // window.location.href = '/login'; // Use with caution to avoid loops
      }
    }
    return Promise.reject(error);
  },
);

export const updateBookProgress = async (
  bookId: string,
  progress: number,
  lastLocation: string,
) => {
  return api.post(`/books/${bookId}/progress`, { progress, lastLocation });
};
