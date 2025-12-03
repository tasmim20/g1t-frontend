import { registerReduxSyncCallback } from "../utils/auth/tokenService";
import { setAccessToken } from "./api/authApi/authSlice";
import { store } from "./store";

registerReduxSyncCallback((token) => {
  store.dispatch(setAccessToken(token));
});
