/* eslint-disable @typescript-eslint/no-unused-vars */
// import type { BaseQueryFn } from "@reduxjs/toolkit/query";
// import type { AxiosRequestConfig, AxiosError } from "axios";
// import { instance } from "./axiosInstance";
// import type { RootState } from "@/src/redux/store";

// interface BaseQueryArgs {
//   url: string;
//   method?: AxiosRequestConfig["method"];
//   data?: AxiosRequestConfig["data"];
//   params?: AxiosRequestConfig["params"];
//   headers?: AxiosRequestConfig["headers"];
// }

// interface BaseQueryError {
//   status: number;
//   data: unknown;
// }

// export const axiosBaseQuery =
//   (
//     { baseUrl }: { baseUrl: string } = { baseUrl: "" }
//   ): BaseQueryFn<BaseQueryArgs, unknown, BaseQueryError> =>
//   async ({ url, method = "GET", data, params, headers }, api) => {
//     // Use RootState instead of any
//     const state = api.getState() as RootState;
//     const token = state.auth.accessToken;

//     try {
//       const response = await instance({
//         url: baseUrl + url,
//         method,
//         data,
//         params,
//         headers: {
//           ...headers,
//           "Content-Type": "application/json",
//           ...(token ? { Authorization: `Bearer ${token}` } : {}),
//         },
//         withCredentials: true,
//       });

//       return { data: response.data };
//     } catch (err) {
//       const error = err as AxiosError<unknown, unknown>; // no any
//       return {
//         error: {
//           status: error.response?.status || 500,
//           data: error.response?.data ?? error.message,
//         },
//       };
//     }
//   };

// src/helpers/axios/axiosBaseQuery.ts
// import type { BaseQueryFn } from "@reduxjs/toolkit/query";
// import type { AxiosRequestConfig, AxiosError } from "axios";
// import { instance } from "./axiosInstance";
// import type { RootState } from "@/src/redux/store";
// import { setAccessToken } from "@/src/redux/api/authApi/authSlice";

// interface BaseQueryArgs {
//   url: string;
//   method?: AxiosRequestConfig["method"];
//   data?: AxiosRequestConfig["data"];
//   params?: AxiosRequestConfig["params"];
//   headers?: AxiosRequestConfig["headers"];
// }

// interface BaseQueryError {
//   status: number;
//   data: unknown;
// }

// export const axiosBaseQuery =
//   (
//     { baseUrl }: { baseUrl: string } = { baseUrl: "" }
//   ): BaseQueryFn<BaseQueryArgs, unknown, BaseQueryError> =>
//   async ({ url, method = "GET", data, params, headers }, api) => {
//     const state = api.getState() as RootState;
//     const token = state.auth.accessToken;

//     try {
//       const response = await instance({
//         url: baseUrl + url,
//         method,
//         data,
//         params,
//         headers: {
//           ...headers,
//           "Content-Type": "application/json",
//           ...(token ? { Authorization: `Bearer ${token}` } : {}),
//         },
//         withCredentials: true,
//       });

//       return { data: response.data };
//     } catch (err) {
//       const error = err as AxiosError;

//       // 🔄 Attempt refresh on 401
//       if (error.response?.status === 401) {
//         try {
//           const refreshRes = await instance.post("/auth/refresh", null, {
//             withCredentials: true,
//           });

//           const newAccessToken = refreshRes.data.accessToken;

//           // ✅ Store new token in Redux
//           api.dispatch(setAccessToken(newAccessToken));

//           // 🔁 Retry original request with new token
//           const retryResponse = await instance({
//             url: baseUrl + url,
//             method,
//             data,
//             params,
//             headers: {
//               ...headers,
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${newAccessToken}`,
//             },
//             withCredentials: true,
//           });

//           return { data: retryResponse.data };
//         } catch (refreshError) {
//           return {
//             error: {
//               status: 401,
//               data: "Unauthorized",
//             },
//           };
//         }
//       }

//       // Other errors
//       return {
//         error: {
//           status: error.response?.status || 500,
//           data: error.response?.data ?? error.message,
//         },
//       };
//     }
//   };

import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosRequestConfig, AxiosError } from "axios";
import { instance, setAxiosAccessToken } from "./axiosInstance";
import type { RootState } from "@/src/redux/store";

export const axiosBaseQuery =
  ({ baseUrl }: { baseUrl: string } = { baseUrl: "" }): BaseQueryFn =>
  async ({ url, method = "GET", data, params }, api) => {
    const state = api.getState() as RootState;
    const token = state.auth.accessToken;

    // give token to axiosInstance
    setAxiosAccessToken(token);

    try {
      const res = await instance({
        url: baseUrl + url,
        method,
        data,
        params,
      });
      return { data: res.data };
    } catch (error) {
      const err = error as AxiosError;
      return {
        error: {
          status: err.response?.status || 500,
          data: err.response?.data || err.message,
        },
      };
    }
  };
