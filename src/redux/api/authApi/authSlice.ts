import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

type TAuthState = {
  user: { role: string } | null;
  accessToken: string | null;
};

const initialState: TAuthState = {
  user: null,
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ role: string; accessToken: string }>
    ) => {
      state.user = { role: action.payload.role };
      state.accessToken = action.payload.accessToken;
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },
});

export const { setUser, setAccessToken, logout } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectUser = (state: RootState) => state.auth.user;
