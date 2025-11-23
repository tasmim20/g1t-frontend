/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { DriverProfile } from "@/src/types";
import { useAuthUser } from "@/src/redux/api/authApi/useAuthUser";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/store";
import { FaUserCircle, FaCarSide } from "react-icons/fa";

const DriverDashboard = () => {
  const { user, id, isLoggedIn } = useAuthUser();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [profile, setProfile] = useState<DriverProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const fetchProfile = async () => {
      if (!id || !user?.role || !accessToken) return;

      try {
        const res = await axios.get<DriverProfile>(
          `${BACKEND_URL}/user/profile`,
          {
            params: { userId: id, role: user.role },
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        setProfile(res.data);
      } catch (err: any) {
        console.error("Failed to fetch Driver profile:", err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn && user?.role === "DRIVER") {
      fetchProfile();
    }
  }, [id, user, isLoggedIn, accessToken, BACKEND_URL]);

  if (loading)
    return <div className="text-center mt-10">Loading Driver profile...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
  if (!profile)
    return <div className="text-center mt-10">No profile found</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg border border-gray-200">
      {/* Profile Header */}
      <div className="flex items-center space-x-6">
        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center border-2 border-gray-300">
          <FaUserCircle className="w-20 h-20 text-gray-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">
            {profile.firstName} {profile.lastName}
          </h1>
          <p className="text-gray-600">{profile.email}</p>

          {profile.address && (
            <p className="text-gray-600">{profile.address}</p>
          )}
        </div>
      </div>

      {/* About / Bio */}
      {profile.bio && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
          <h2 className="font-semibold text-gray-700 mb-2">About Me</h2>
          <p className="text-gray-600">{profile.bio}</p>
        </div>
      )}

      {/* Vehicle Info */}
      {profile.bio && (
        <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-gray-100 flex items-center space-x-4">
          <FaCarSide className="w-8 h-8 text-yellow-600" />
          <div>
            <p className="text-gray-600 font-semibold">BMW</p>
            <p className="text-gray-500 text-sm">1345GHD</p>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="p-4 bg-green-50 rounded-lg text-center">
          <p className="text-sm text-gray-500">Rides Completed</p>
          <p className="font-bold text-lg">10</p>
        </div>
        <div className="p-4 bg-blue-50 rounded-lg text-center">
          <p className="text-sm text-gray-500">Rating</p>
          <p className="font-bold text-lg">⭐</p>
        </div>
      </div>

      {/* Availability */}
      <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-gray-100 text-center">
        <p className="text-gray-600 font-semibold">Availability Status</p>
        <p className="text-lg font-bold">ONLINE</p>
      </div>
    </div>
  );
};

export default DriverDashboard;
