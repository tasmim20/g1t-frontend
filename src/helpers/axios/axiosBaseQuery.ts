import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosRequestConfig, AxiosError } from "axios";
import { instance } from "./axiosInstance";
import type { RootState } from "@/src/redux/store";

interface BaseQueryArgs {
  url: string;
  method?: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig["data"];
  params?: AxiosRequestConfig["params"];
  headers?: AxiosRequestConfig["headers"];
}

interface BaseQueryError {
  status: number;
  data: unknown;
}

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<BaseQueryArgs, unknown, BaseQueryError> =>
  async ({ url, method = "GET", data, params, headers }, api) => {
    // Use RootState instead of any
    const state = api.getState() as RootState;
    const token = state.auth.accessToken;

    try {
      const response = await instance({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: {
          ...headers,
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        withCredentials: true,
      });

      return { data: response.data };
    } catch (err) {
      const error = err as AxiosError<unknown, unknown>; // no any
      return {
        error: {
          status: error.response?.status || 500,
          data: error.response?.data ?? error.message,
        },
      };
    }
  };
