// export const setAccessToken = (key: string, token: string) => {
//   if (!key || typeof window === "undefined") {
//     return "";
//   }
//   return localStorage.setItem(key, token);
// };

// export const getAccessToken = (key: string) => {
//   if (!key || typeof window === "undefined") {
//     return "";
//   }
//   return localStorage.getItem(key);
// };

// export const removeAccessToken = (key: string) => {
//   if (!key || typeof window === "undefined") {
//     return "";
//   }
//   return localStorage.removeItem(key);
// };

// export const setAccessToken = (key: string, token: string) => {
//   if (!key || typeof window === "undefined") {
//     return "";
//   }

//   try {
//     localStorage.setItem(key, token);
//   } catch (error) {
//     console.error("Error storing token in localStorage:", error);
//   }
// };

// export const getAccessToken = (key: string) => {
//   if (!key || typeof window === "undefined") {
//     return "";
//   }

//   return localStorage.getItem(key) || ""; // Return empty string if not found
// };

// export const removeAccessToken = (key: string) => {
//   if (!key || typeof window === "undefined") {
//     return "";
//   }

//   try {
//     localStorage.removeItem(key);
//   } catch (error) {
//     console.error("Error removing token from localStorage:", error);
//   }
// };

// import Cookies from "js-cookie";

// const cookieOptions = {
//   secure: process.env.NODE_ENV === "production",
//   sameSite: "strict" as const,
// };

// export const getAccessToken = () => Cookies.get("access_token") || null;

// export const setAccessToken = (token: string) =>
//   Cookies.set("access_token", token, cookieOptions);

// export const removeAccessToken = () =>
//   Cookies.remove("access_token", cookieOptions);
