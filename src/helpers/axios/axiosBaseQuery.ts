import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosError } from "axios";

import instance from "../axios/axiosInstance"; // your axios instance with refresh logic

interface BaseQueryArgs {
  url: string;
  method?: string;
  data?: unknown;
  params?: unknown;
}

interface BaseQueryError {
  status: number;
  data: unknown;
}

/**
 * Custom RTK Query base query using axios instance
 * - Access token handled in memory by axiosInstance
 * - Refresh token handled automatically via interceptor
 */
export const axiosBaseQuery =
  ({ baseUrl = "" } = {}): BaseQueryFn<
    BaseQueryArgs,
    unknown,
    BaseQueryError
  > =>
  async ({ url, method = "GET", data, params }) => {
    try {
      const response = await instance({
        url: baseUrl + url,
        method,
        data,
        params,
        withCredentials: true, // ensures HttpOnly refresh cookie is sent
      });

      return { data: response.data };
    } catch (error) {
      const err = error as AxiosError;

      // 401 / token refresh already handled in axiosInstance interceptor
      return {
        error: {
          status: err.response?.status || 500,
          data: err.response?.data || err.message,
        },
      };
    }
  };
