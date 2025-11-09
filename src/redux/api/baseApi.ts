// // Need to use the React-specific entry point to import createApi

// import { axiosBaseQuery } from "@/src/helpers/axios/axiosBaseQuery";
// import { createApi } from "@reduxjs/toolkit/query/react";

// // Define a service using a base URL and expected endpoints
// export const baseApi = createApi({
//   reducerPath: "api",
//   baseQuery: axiosBaseQuery({
//     baseUrl: "http://localhost:5000/",
//   }),
//   endpoints: () => ({}),
//   tagTypes: ["courses", "instructors", "reviews"],
// });
import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../helpers/axios/axiosBaseQuery";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: () => ({}),
});
