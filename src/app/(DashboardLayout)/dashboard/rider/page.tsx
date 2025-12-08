/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useEffect, useState } from "react";
import { FaUserCircle, FaEdit, FaTrash, FaKey } from "react-icons/fa";
import { store } from "@/src/redux/store";
import {
  getMemoryAccessToken,
  setMemoryAccessToken,
} from "@/src/utils/auth/tokenService";
import instance from "@/src/helpers/axios/axiosInstance";
import { RiderProfile } from "@/src/types";
import { Toaster } from "react-hot-toast";
import UpdateProfile from "./profile/UpdateProfile";
import ResetPassword from "./profile/ResetPassword";
import DeleteProfile from "./profile/DeleteProfile";

const RiderDashboard = () => {
  const [profile, setProfile] = useState<RiderProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showUpdate, setShowUpdate] = useState(false);
  const [showReset, setShowReset] = useState(false);

  useEffect(() => {
    const reduxToken = store.getState().auth.accessToken;
    if (reduxToken && !getMemoryAccessToken()) setMemoryAccessToken(reduxToken);

    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await instance.get<RiderProfile>("/user/profile/me");
        const data = res.data;
        const normalizedProfile: RiderProfile = {
          profileId: data.profileId,
          userId: data.userId,
          email: data.email ?? "",
          firstName: data.firstName ?? "",
          lastName: data.lastName ?? "",
          mobileNumber: data.mobileNumber ?? "",
          profilePhoto: data.profilePhoto ?? "",
          address: data.address ?? "",
          bio: data.bio ?? "",
          role: data.role ?? "RIDER",
        };
        setProfile(normalizedProfile);
      } catch (err: any) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to fetch profile"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleProfileUpdate = (updated: Partial<RiderProfile>) => {
    setProfile((prev) => ({
      ...prev!,
      ...updated,
    }));
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  if (!profile) return <div>No profile found</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border border-gray-200 relative">
      <Toaster position="top-right" />

      {/* Update Profile Icon at Top-Right */}
      <button
        onClick={() => setShowUpdate(!showUpdate)}
        className={`absolute top-4 right-4 p-2 rounded-full shadow hover:bg-gray-100 transition ${
          showUpdate ? "bg-gray-300 text-black" : "bg-[#54b0ba] text-white"
        }`}
        title={showUpdate ? "Cancel Update" : "Update Profile"}
      >
        <FaEdit className="w-5 h-5" />
      </button>

      {/* Profile Header */}
      <div className="flex items-center space-x-6 border-b border-gray-200 pb-6">
        <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100 flex justify-center items-center">
          {profile.profilePhoto ? (
            <img
              src={profile.profilePhoto}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <FaUserCircle className="w-24 h-24 text-gray-400" />
          )}
        </div>

        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-800">
            {profile.firstName || "First Name"}{" "}
            {profile.lastName || "Last Name"}
          </h1>
          <p className="text-gray-600 mt-1">{profile.email || "-"}</p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="p-4 bg-green-50 rounded-lg text-center">
          <p className="text-sm text-gray-500">Address</p>
          <p className="font-bold text-lg">{profile.address || "-"}</p>
        </div>
        <div className="p-4 bg-blue-50 rounded-lg text-center">
          <p className="text-sm text-gray-500">Contact Number</p>
          <p className="font-bold text-lg">{profile.mobileNumber || "-"}</p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg text-center">
          <p className="text-sm text-gray-500">About</p>
          <p className="font-bold text-lg">{profile.bio || "-"}</p>
        </div>
        <div className="p-4 bg-blue-50 rounded-lg text-center">
          <p className="text-sm text-gray-500">Role</p>
          <p className="font-bold text-lg">{profile.role || "-"}</p>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="flex justify-between mt-6">
        {/* Reset Password Inline */}
        <div>
          <button
            onClick={() => setShowReset(!showReset)}
            className={`flex items-center gap-2 p-2 rounded ${
              showReset ? "bg-gray-300 text-black" : "bg-gray-600 text-white"
            }`}
          >
            <FaKey className="w-4 h-4" />
            {showReset ? "Cancel Reset" : "Reset Password"}
          </button>

          {showReset && (
            <div className="mt-4">
              <ResetPassword
                profile={profile}
                email={profile.email}
                onClose={() => setShowReset(false)}
              />
            </div>
          )}
        </div>

        {/* Delete Profile */}
        <div>
          <DeleteProfile>
            <FaTrash className="w-4 h-4 mr-1" /> Delete Profile
          </DeleteProfile>
        </div>
      </div>

      {/* Update Profile Inline */}
      {showUpdate && (
        <div className="mt-6">
          <UpdateProfile
            profile={profile}
            onUpdate={handleProfileUpdate}
            onClose={() => setShowUpdate(false)}
            email={profile.email}
          />
        </div>
      )}
    </div>
  );
};

export default RiderDashboard;
