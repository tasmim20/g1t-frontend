// src/utils/logoutUser.ts
import { store, persistor } from "@/src/redux/store";
import { logout } from "@/src/redux/api/authApi/authSlice";
import { setMemoryAccessToken } from "../auth/tokenService";
import instance from "@/src/helpers/axios/axiosInstance";
import { stopTokenRefresh } from "@/src/helpers/tokenManager";

export const logoutUser = async () => {
  try {
    // Call backend logout endpoint via RTK Query
    // If your logout mutation requires an argument, pass undefined or the
    // refreshToken
    stopTokenRefresh();
    await instance.post("/auth/logout", null, { withCredentials: true });
    setMemoryAccessToken(null);
    // Clear Redux auth state
    store.dispatch(logout());

    // Clear persisted storage (redux-persist)
    // await persistor.purge();

    // Redirect to login page
    window.location.href = "/login";
  } catch (error) {
    console.error("Logout failed:", error);

    // Fallback: clear state anyway
    store.dispatch(logout());
    await persistor.purge();
    window.location.href = "/login";
  }
};
