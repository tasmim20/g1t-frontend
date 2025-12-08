/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { useDispatch } from "react-redux";
import { useLoginMutation } from "@/src/redux/api/authApi/authApi";
import { setUser } from "@/src/redux/api/authApi/authSlice";
import Link from "next/link";
import { setMemoryAccessToken } from "@/src/utils/auth/tokenService";
import { verifyToken } from "@/src/utils/verifyToken";
import { startTokenRefresh } from "@/src/helpers/tokenManager";
// import { setMemoryAccessToken } from "@/src/utils/auth/tokenService";
// Login form interface
interface LoginFormValues {
  email: string;
  password: string;
}

// Zod validation
const validationSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(validationSchema),
  });

  const router = useRouter();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();
  const [loginError, setLoginError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    setLoginError(null);
    try {
      const res: any = await login(data).unwrap();
      const token = res.accessToken;

      // -------------------
      // 2️⃣ Store token in memory (for axios interceptors / proactive refresh)
      // -------------------

      // Access token stored in Redux memorypro
      dispatch(
        setUser({
          role: res.role,
          accessToken: res.accessToken,
        })
      );
      setMemoryAccessToken(res.accessToken);

      startTokenRefresh(token);

      // -------------------
      // 3️⃣ Optional: decode token if needed
      // -------------------
      // const decoded = verifyToken(res.accessToken);
      // console.log("Decoded token:", decoded);
      // setMemoryAccessToken(res.accessToken);
      // dispatch(setUser({ role: res.role, accessToken: res.accessToken }));

      // Redirect based on role
      if (res.role === "RIDER") router.replace("/dashboard/rider");
      else if (res.role === "DRIVER") router.replace("/dashboard/driver");
      else if (res.role === "ADMIN") router.replace("/dashboard/admin");
      else router.replace("/");
    } catch (err: any) {
      console.error(err);
      setLoginError(err.data?.message || "Login failed. Please try again.");
      toast.error(err.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>

        {loginError && (
          <div className="mb-4 text-red-600 text-sm bg-red-50 border border-red-200 p-2 rounded">
            {loginError}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Password
          </label>
          <input
            type="password"
            {...register("password")}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}

          {/* Forgot Password link */}
          <div className="mt-2 text-right">
            <Link
              href="/forgot-password"
              className="text-blue-600 text-sm underline"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#257417] text-white font-semibold py-3 rounded-md  transition-colors disabled:bg-gray-400"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        <div className="mt-4 text-center">
          <p className="text-gray-600 text-sm">
            Don't have an account?{" "}
            <Link href="/register" className="text-blue-600 underline">
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
