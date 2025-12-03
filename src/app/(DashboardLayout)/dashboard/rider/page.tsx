/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
// use Axios instance with interceptors
import { RiderProfile } from "@/src/types";
import { useAuthUser } from "@/src/redux/api/authApi/useAuthUser";
import { FaUserCircle } from "react-icons/fa";
import { store } from "@/src/redux/store";
import {
  getMemoryAccessToken,
  setMemoryAccessToken,
} from "@/src/utils/auth/tokenService";
import instance from "@/src/helpers/axios/axiosInstance";

const RiderDashboard = () => {
  const [profile, setProfile] = useState<RiderProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       // Call /user/profile/me without query params
  //       const res = await instance.get<RiderProfile>("/user/profile/me");
  //       setProfile(res.data);
  //     } catch (err: any) {
  //       console.error("Failed to fetch Rider profile:", err);
  //       setError(err.response?.data?.message || err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (isLoggedIn && user?.role === "RIDER") {
  //     fetchProfile();
  //   }
  // }, [isLoggedIn, user]);
  // useEffect(() => {
  //   if (!isLoggedIn) return;
  //   // setMemoryAccessToken(store.getState().auth.accessToken);

  //   const fetchProfile = async () => {
  //     try {
  //       const res = await instance.get<RiderProfile>("/user/profile/me");
  //       setProfile(res.data);
  //     } catch (err: any) {
  //       setError(err.response?.data?.message || err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProfile();
  // }, [isLoggedIn]);

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     setLoading(true);
  //     setError(null);

  //     try {
  //       // Axios instance automatically adds Authorization header
  //       const res = await instance.get<RiderProfile>("/user/profile/me");
  //       setProfile(res.data);
  //     } catch (err: any) {
  //       console.error("Failed to fetch Rider profile:", err);
  //       setError(
  //         err.response?.data?.message ||
  //           err.message ||
  //           "Failed to fetch profile"
  //       );
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProfile();
  // }, []);

  useEffect(() => {
    // Sync Redux token to memory for Axios instance
    const reduxToken = store.getState().auth.accessToken;
    if (reduxToken && !getMemoryAccessToken()) {
      setMemoryAccessToken(reduxToken);
    }

    const fetchProfile = async () => {
      setLoading(true);
      setError(null);

      try {
        // Axios instance automatically attaches token from memory
        const res = await instance.get<RiderProfile>("/user/profile/me");
        setProfile(res.data);
      } catch (err: any) {
        console.error("Failed to fetch Rider profile:", err);
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

  if (loading)
    return <div className="text-center mt-10">Loading Rider profile...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
  if (!profile)
    return <div className="text-center mt-10">No profile found</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg border border-gray-200">
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

      {profile.bio && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
          <h2 className="font-semibold text-gray-700 mb-2">About Me</h2>
          <p className="text-gray-600">{profile.bio}</p>
        </div>
      )}

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="p-4 bg-green-50 rounded-lg text-center">
          <p className="text-sm text-gray-500">Rides Completed</p>
          <p className="font-bold text-lg">1</p>
        </div>
        <div className="p-4 bg-blue-50 rounded-lg text-center">
          <p className="text-sm text-gray-500">Rating</p>
          <p className="font-bold text-lg">N/A ⭐</p>
        </div>
      </div>
    </div>
  );
};

export default RiderDashboard;
