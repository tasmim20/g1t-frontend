import { SignupDto } from "@/src/types";
import { baseApi } from "../baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (signupDto: SignupDto) => ({
        url: "/auth/register",
        method: "POST",
        data: signupDto,
      }),
    }),
    login: builder.mutation({
      query: (loginDto: { email: string; password: string }) => ({
        url: "/auth/login",
        method: "POST",
        data: loginDto,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    refresh: builder.mutation({
      query: () => ({
        url: "/auth/refresh",
        method: "POST",
      }),
    }),
    forgotPassword: builder.mutation({
      query: (email: string) => ({
        url: "/auth/forgot-password",
        method: "POST",
        data: { email },
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useRefreshMutation,
  useForgotPasswordMutation,
} = authApi;
