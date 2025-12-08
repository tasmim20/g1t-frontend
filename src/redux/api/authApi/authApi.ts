/* eslint-disable @typescript-eslint/no-explicit-any */

import { RiderProfile } from "@/src/types";
import { baseApi } from "../baseApi";

export const authApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (formData: any) => ({
        url: "/auth/register",
        method: "POST",
        data: formData,
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
    resetPassword: builder.mutation({
      query: (payload: {
        email: string;
        otp: string;
        newPassword: string;
      }) => ({
        url: "/auth/reset-password",
        method: "POST",
        data: payload,
      }),
    }),

    // ✅ New Endpoints
    updateProfile: builder.mutation<RiderProfile, FormData>({
      query: (payload) => ({
        url: "/user/profile/update",
        method: "PATCH",
        data: payload,
        headers: { "Content-Type": "multipart/form-data" },
      }),
    }),

    deleteProfile: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/user/profile/delete",
        method: "DELETE",
      }),
    }),

    resetWithoutOtp: builder.mutation<
      { message: string },
      { email: string; currentPassword: string; newPassword: string }
    >({
      query: (payload) => ({
        url: "/auth/reset-without-otp",
        method: "POST",
        data: payload,
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
  useResetPasswordMutation,
  useUpdateProfileMutation,
  useDeleteProfileMutation,
  useResetWithoutOtpMutation,
} = authApi;
