/* eslint-disable @typescript-eslint/no-explicit-any */
// src/helpers/axiosInstance.ts
import axios from "axios";
import {
  getMemoryAccessToken,
  setMemoryAccessToken,
} from "@/src/utils/auth/tokenService";
import {
  startTokenRefresh,
  stopTokenRefresh,
  setAxiosAuth,
} from "../tokenManager";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "",
  withCredentials: true,
});

// --------------------
// REQUEST: attach token from memory only
// --------------------
instance.interceptors.request.use((config) => {
  const token = getMemoryAccessToken();
  // console.log("Axios request token:", token);
  if (token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// --------------------
// RESPONSE: handle 401 -> refresh -> retry
// --------------------
let isRefreshing = false;
let queue: Array<{ resolve: (v?: any) => void; reject: (e?: any) => void }> =
  [];

function processQueue(error: any, token: string | null = null) {
  queue.forEach((p) => (error ? p.reject(error) : p.resolve(token)));
  queue = [];
}

instance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push({ resolve, reject });
        }).then((token) => {
          original.headers["Authorization"] = `Bearer ${token}`;
          return instance(original);
        });
      }

      isRefreshing = true;
      try {
        const res = await instance.post(
          "/auth/refresh",
          {},
          {
            withCredentials: true,
          }
        );
        const newToken = res.data?.access_token ?? res.data?.accessToken;

        if (!newToken) throw new Error("No token from refresh");

        // 🔹 update memory token (Redux auto-updates via callback)
        setMemoryAccessToken(newToken);
        setAxiosAuth(newToken);
        startTokenRefresh(newToken);

        processQueue(null, newToken);

        original.headers["Authorization"] = `Bearer ${newToken}`;
        return instance(original);
      } catch (err) {
        processQueue(err, null);
        stopTokenRefresh();
        setMemoryAccessToken(null); // memory cleared -> Redux auto-clears
        setAxiosAuth(null);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
