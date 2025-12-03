/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect } from "react";
import instance from "@/src/helpers/axios/axiosInstance";
import { setMemoryAccessToken } from "@/src/utils/auth/tokenService";
import { startTokenRefresh } from "@/src/helpers/tokenManager";
import { store } from "@/src/redux/store";
import { setAccessToken, setUser } from "@/src/redux/api/authApi/authSlice";

export default function AppInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    async function restoreSession() {
      try {
        const res = await instance.post(
          "/auth/refresh",
          {},
          { withCredentials: true }
        );
        const token = res.data?.accessToken ?? res.data?.access_token;
        if (!token) return;

        setMemoryAccessToken(token);
        store.dispatch(setAccessToken(token));

        const decoded: any = JSON.parse(atob(token.split(".")[1]));
        store.dispatch(setUser({ role: decoded.role, accessToken: token }));

        startTokenRefresh(token);
      } catch (err: any) {
        if (err.response?.status !== 401)
          console.error("Unexpected error restoring session:", err);
      }
    }

    restoreSession();
  }, []);

  return <>{children}</>;
}
