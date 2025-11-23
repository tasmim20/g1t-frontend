/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForgotPasswordMutation } from "@/src/redux/api/authApi/authApi";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res: any = await forgotPassword(email).unwrap();
      setMessage(res.message);

      // Redirect to Reset Password page with email as query parameter
      router.push(`/reset-password?email=${encodeURIComponent(email)}`);
    } catch (err: any) {
      setError(err.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Forgot Password
        </h2>

        <p className="text-gray-600 text-sm mb-4 text-center">
          Enter your email to receive a one-time OTP to reset your password.
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

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#257417] text-white font-semibold py-3 rounded-md transition-colors disabled:bg-gray-400"
        >
          {isLoading ? "Sending..." : "Send OTP"}
        </button>
      </form>
    </div>
  );
}
