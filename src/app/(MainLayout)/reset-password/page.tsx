/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useResetPasswordMutation } from "@/src/redux/api/authApi/authApi";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const res: any = await resetPassword({
        email,
        otp,
        newPassword,
      }).unwrap();
      setMessage(res.message);

      // Redirect to login after 2 seconds
      setTimeout(() => router.push("/login"), 2000);
    } catch (err: any) {
      setError(err.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen my-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-sm rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Reset Password
        </h2>

        <p className="text-gray-600 text-sm mb-4 text-center">
          Enter your email, OTP, and new password to reset your account
          password.
        </p>

        {message && (
          <div className="mb-4 text-green-700 text-sm bg-green-50 border border-green-200 p-2 rounded">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-4 text-red-600 text-sm bg-red-50 border border-red-200 p-2 rounded">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            OTP
          </label>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            New Password
          </label>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#257417] text-white font-semibold py-3 rounded-md transition-colors disabled:bg-gray-400"
        >
          {isLoading ? "Resetting..." : "Reset Password"}
        </button>

        <div className="mt-4 text-center">
          <p className="text-gray-600 text-sm">
            Remember your password?{" "}
            <a href="/login" className="text-blue-600 underline">
              Login
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
