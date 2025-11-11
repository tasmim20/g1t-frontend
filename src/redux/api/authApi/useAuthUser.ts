// src/utils/auth.ts
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

import { verifyToken } from "../../../utils/verifyToken";
import { CustomJwtPayload } from "../../../types";

export const useAuthUser = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  const user: CustomJwtPayload | null = useMemo(() => {
    if (!accessToken) return null;
    try {
      return verifyToken(accessToken) as CustomJwtPayload;
    } catch (err) {
      console.error("Token verification failed:", err);
      return null;
    }
  }, [accessToken]);

  const isLoggedIn = !!user?.role && !!user?.email;

  return { user, isLoggedIn };
};
