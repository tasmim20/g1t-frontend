// import { setAccessToken } from "@/src/redux/api/authApi/authSlice";
// import { store } from "@/src/redux/store";

// let accessToken: string | null = null;

// export const setMemoryAccessToken = (token: string | null) => {
//   accessToken = token;
// };

// export const getMemoryAccessToken = () => accessToken;
// export const initMemoryToken = () => {
//   const reduxToken = store.getState().auth.accessToken;
//   if (reduxToken) setMemoryAccessToken(reduxToken);
// };

// // tokenService.ts
// import { store } from "@/src/redux/store";

// export const getAccessToken = () => {
//   return store.getState().auth.accessToken;
// };
// src/helpers/authToken.ts
let memoryAccessToken: string | null = null;

export function getMemoryAccessToken(): string | null {
  return memoryAccessToken;
}

export function setMemoryAccessToken(token: string) {
  memoryAccessToken = token;
}

export function clearMemoryAccessToken() {
  memoryAccessToken = null;
}
