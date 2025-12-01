import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosError } from "axios";

import { store } from "@/src/redux/store";
import { setAccessToken } from "@/src/redux/api/authApi/authSlice";
import { instance } from "./axiosInstance";

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
        withCredentials: true, // ensure refresh cookie is sent
      });

      return { data: response.data };
    } catch (error) {
      const err = error as AxiosError;

      // 401 / refresh already handled in axiosInstance interceptor
      return {
        error: {
          status: err.response?.status || 500,
          data: err.response?.data || err.message,
        },
      };
    }
  };
