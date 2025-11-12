import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../helpers/axios/axiosBaseQuery";

// Access backend URL from environment
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL! }),
  endpoints: () => ({}),
});
