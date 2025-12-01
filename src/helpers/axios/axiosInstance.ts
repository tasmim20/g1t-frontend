// src/helpers/axios/axiosInstance.ts
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { store } from "@/src/redux/store";
import { setAccessToken } from "@/src/redux/api/authApi/authSlice";

// Memory token holder
let accessTokenMemory: string | null = null;
export const setMemoryAccessToken = (token: string | null) => {
  accessTokenMemory = token;
};

// Flag & queue for refresh requests
export const refreshState = { isRefreshing: false };
let refreshSubscribers: ((token: string) => void)[] = [];

export const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

// Axios for main API calls
export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true, // include cookies
  headers: { "Content-Type": "application/json" },
});

// Axios for refresh token call
export const refreshAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

// Attach access token from memory
instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (accessTokenMemory) {
    config.headers["Authorization"] = `Bearer ${accessTokenMemory}`;
  }
  return config;
});

// Handle 401 → refresh token
instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/auth/refresh"
    ) {
      originalRequest._retry = true;

      if (refreshState.isRefreshing) {
        // Queue requests
        return new Promise((resolve) => {
          refreshSubscribers.push((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            resolve(instance(originalRequest));
          });
        });
      }

      refreshState.isRefreshing = true;

      try {
        const res = await refreshAxios.post<{ accessToken: string }>(
          "/auth/refresh"
        );
        const newToken = res.data.accessToken;
        if (!newToken) throw new Error("No access token from refresh");

        // Save in memory & Redux
        setMemoryAccessToken(newToken);
        store.dispatch(setAccessToken(newToken));

        // Notify queued requests
        onRefreshed(newToken);

        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return instance(originalRequest);
      } catch (err) {
        setMemoryAccessToken(null);
        store.dispatch(setAccessToken(null));
        if (typeof window !== "undefined") window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        refreshState.isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// Initialize token from Redux on app load
export const initAxiosToken = () => {
  const token = store.getState().auth.accessToken;
  if (token) setMemoryAccessToken(token);
};
