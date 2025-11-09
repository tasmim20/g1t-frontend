// src/utils/logoutUser.ts
import { store, persistor } from "@/src/redux/store";
import { authApi } from "@/src/redux/api/authApi/authApi"; // your RTK Query API
import { logout } from "@/src/redux/api/authApi/authSlice";

export const logoutUser = async () => {
  try {
    // Call backend logout endpoint via RTK Query
    // If your logout mutation requires an argument, pass undefined or the refreshToken
    await store.dispatch(authApi.endpoints.logout.initiate(undefined));

    // Clear Redux auth state
    store.dispatch(logout());

    // Clear persisted storage (redux-persist)
    await persistor.purge();

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
