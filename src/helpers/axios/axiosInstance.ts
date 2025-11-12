// src/helpers/axios/axiosInstance.ts
import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosHeaders,
} from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL!,
  withCredentials: true, // send cookies automatically
  headers: new AxiosHeaders({
    "Content-Type": "application/json",
    Accept: "application/json",
  }),
  timeout: 60000,
});

// Request interceptor
instance.interceptors.request.use(
  (
    config: InternalAxiosRequestConfig & { token?: string; _retry?: boolean }
  ) => {
    if (config.token) {
      // Merge existing headers with Authorization
      config.headers = new AxiosHeaders(config.headers).set(
        "Authorization",
        `Bearer ${config.token}`
      );
    }
    return config;
  }
);

// Response interceptor: auto-refresh on 401
instance.interceptors.response.use(
  (response) => response,
  async (
    error: AxiosError & {
      config?: InternalAxiosRequestConfig & { _retry?: boolean };
    }
  ) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const refreshRes = await instance.post("/auth/refresh");
        const newAccessToken = refreshRes.data.accessToken;

        // Retry original request with new token
        if (originalRequest.headers) {
          originalRequest.headers = new AxiosHeaders(
            originalRequest.headers
          ).set("Authorization", `Bearer ${newAccessToken}`);
        }

        return instance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export { instance };
