/* eslint-disable @typescript-eslint/no-require-imports */
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./api/authApi/authSlice";

// lazy import baseApi to avoid circular dependency
let baseApi;
try {
  baseApi = require("./api/baseApi").baseApi;
} catch (e) {
  console.warn("baseApi not loaded yet");
}

export const rootReducer = combineReducers({
  auth: authReducer,
  ...(baseApi ? { [baseApi.reducerPath]: baseApi.reducer } : {}),
});

export type RootState = ReturnType<typeof rootReducer>;
