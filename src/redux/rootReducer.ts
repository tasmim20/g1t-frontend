import { combineReducers } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import authReducer from "./api/authApi/authSlice";
// adjust path if needed

export const rootReducer = combineReducers({
  auth: authReducer, // Auth state slice
  [baseApi.reducerPath]: baseApi.reducer, // RTK Query API slice
});
