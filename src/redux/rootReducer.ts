/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-require-imports */
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./api/authApi/authSlice";

// lazy import baseApi to avoid circular dependency
let baseApi: any = null;
try {
  const apiModule = require("./api/baseApi");
  baseApi = apiModule?.baseApi ?? null;
} catch (e) {
  console.warn("baseApi not loaded yet", e);
}

export const rootReducer = combineReducers({
  auth: authReducer,
  ...(baseApi && baseApi.reducerPath
    ? { [baseApi.reducerPath]: baseApi.reducer }
    : {}),
});

export type RootState = ReturnType<typeof rootReducer>;
