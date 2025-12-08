/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useDeleteProfileMutation } from "@/src/redux/api/authApi/authApi";
import { logoutUser } from "@/src/utils/actions/logout";
import toast from "react-hot-toast";

export default function DeleteProfile() {
  const [deleteProfile, { isLoading }] = useDeleteProfileMutation();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete your profile?")) return;

    try {
      await deleteProfile().unwrap();

      toast.success("Profile deleted successfully!");

      // Logout user after deletion
      await logoutUser();
      window.location.href = "/register";
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete profile");
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isLoading}
      className={`flex items-center gap-2 p-2 rounded text-white transition ${
        isLoading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-red-500 hover:bg-red-600"
      }`}
    >
      {isLoading ? "Deleting..." : "Delete Profile"}
    </button>
  );
}
