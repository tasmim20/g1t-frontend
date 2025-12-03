/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtDecode } from "jwt-decode";
import { store } from "@/src/redux/store";
import instance from "./axios/axiosInstance";
import { logout, setAccessToken } from "../redux/api/authApi/authSlice";

let refreshTimer: NodeJS.Timeout | null = null;

// set or clear Authorization header on instance
export function setAxiosAuth(token: string | null) {
  if (token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common["Authorization"];
  }
}

// extract expiry (ms) from token
export function getExpiryMs(token: string): number | null {
  try {
    const decoded: any = jwtDecode(token);
    return decoded.exp * 1000;
  } catch {
    return null;
  }
}

// start proactive refresh 1 minute before expiry
export function startTokenRefresh(token: string) {
  const expiryMs = getExpiryMs(token);
  if (!expiryMs) return;

  const now = Date.now();
  const timeLeft = expiryMs - now;
  const refreshIn = timeLeft - 60_000; // 1 minute before

  if (refreshTimer) clearTimeout(refreshTimer);

  // ensure at least a small positive delay
  const delay = Math.max(refreshIn, 2000);

  refreshTimer = setTimeout(async () => {
    try {
      const res = await instance.post("/auth/refresh", {
        withCredentials: true,
      });
      const newToken = res.data?.access_token ?? res.data?.accessToken;
      if (!newToken) throw new Error("No token");

      // update redux + axios + restart timer
      store.dispatch(setAccessToken(newToken));
      setAxiosAuth(newToken);
      startTokenRefresh(newToken);
    } catch (err) {
      // cannot refresh -> logout
      stopTokenRefresh();
      store.dispatch(logout());
      setAxiosAuth(null);
    }
  }, delay);
}

export function stopTokenRefresh() {
  if (refreshTimer) {
    clearTimeout(refreshTimer);
    refreshTimer = null;
  }
}
