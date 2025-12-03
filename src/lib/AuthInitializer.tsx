"use client";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAccessToken,
  selectAccessToken,
} from "@/src/redux/api/authApi/authSlice";

import { setMemoryAccessToken } from "../utils/auth/tokenService";
import instance from "../helpers/axios/axiosInstance";

export const AuthInitializer = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const reduxToken = useSelector(selectAccessToken);
  const initialized = useRef(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const initAuth = async () => {
      // If Redux already has token (just logged in), set memory token
      if (reduxToken) {
        setMemoryAccessToken(reduxToken);
        setLoading(false);
        return;
      }

      try {
        const res = await instance.post("/auth/refresh", {}); // cookie sent automatically
        const token = res.data.accessToken;
        if (token) {
          setMemoryAccessToken(token);
          dispatch(setAccessToken(token));
        }
      } catch {
        dispatch(setAccessToken(null));
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [dispatch, reduxToken]);

  if (loading) return <div>Loading...</div>; // prevent showing page until auth is initialized
  return <>{children}</>;
};
