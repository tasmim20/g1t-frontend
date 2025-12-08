/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { RiderProfile } from "@/src/types";
import { useResetWithoutOtpMutation } from "@/src/redux/api/authApi/authApi";

interface Props {
  profile: RiderProfile;
  onClose: () => void;
}

export default function ResetPassword({ profile, onClose }: Props) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [resetPassword, { isLoading }] = useResetWithoutOtpMutation();

  const handleReset = async () => {
    if (!currentPassword || !newPassword) {
      toast.error("Please fill both fields");
      return;
    }

    try {
      await resetPassword({
        email: profile.email,
        currentPassword,
        newPassword,
      }).unwrap();

      toast.success("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
      onClose();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update password");
    }
  };

  return (
    <div className="mt-6 p-6 bg-gray-50 rounded-lg border">
      <h2 className="font-semibold mb-3 text-lg">Reset Password</h2>

      <input
        type="password"
        placeholder="Current Password"
        className="w-full p-2 mb-3 border rounded border-gray-400"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
      />

      <input
        type="password"
        placeholder="New Password"
        className="w-full p-2 mb-3 border rounded border-gray-400"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <button
        onClick={handleReset}
        disabled={isLoading}
        className={`w-full p-2 rounded text-white ${
          isLoading ? "bg-gray-400" : "bg-gray-700 hover:bg-gray-800"
        }`}
      >
        {isLoading ? "Updating..." : "Update Password"}
      </button>
    </div>
  );
}
