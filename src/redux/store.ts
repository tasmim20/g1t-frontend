/* eslint-disable @typescript-eslint/no-require-imports */
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./api/authApi/authSlice";
import { baseApi } from "./api/baseApi";

// --------------------
// Persist config
// --------------------
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // only persist auth slice
};

// --------------------
// Root reducer
// --------------------
const rootReducer = combineReducers({
  auth: authReducer,
  [baseApi.reducerPath]: baseApi.reducer, // do NOT persist baseApi
});

// --------------------
// Persisted reducer
// --------------------
const persistedReducer = persistReducer(persistConfig, rootReducer);

// --------------------
// Configure store
// --------------------
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

// --------------------
// Persistor
// --------------------
export const persistor = persistStore(store);

// --------------------
// Types
// --------------------
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
