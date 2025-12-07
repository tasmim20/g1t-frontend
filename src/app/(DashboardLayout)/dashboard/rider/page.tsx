// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import { useEffect, useState } from "react";
// // use Axios instance with interceptors
// import { RiderProfile } from "@/src/types";
// import { FaUserCircle } from "react-icons/fa";
// import { store } from "@/src/redux/store";
// import {
//   getMemoryAccessToken,
//   setMemoryAccessToken,
// } from "@/src/utils/auth/tokenService";
// import instance from "@/src/helpers/axios/axiosInstance";

// const RiderDashboard = () => {
//   const [profile, setProfile] = useState<RiderProfile | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     // Sync Redux token to memory for Axios instance
//     const reduxToken = store.getState().auth.accessToken;
//     if (reduxToken && !getMemoryAccessToken()) {
//       setMemoryAccessToken(reduxToken);
//     }

//     const fetchProfile = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         // Axios instance automatically attaches token from memory
//         const res = await instance.get<RiderProfile>("/user/profile/me");
//         setProfile(res.data);
//       } catch (err: any) {
//         console.error("Failed to fetch Rider profile:", err);
//         setError(
//           err.response?.data?.message ||
//             err.message ||
//             "Failed to fetch profile"
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   if (loading)
//     return <div className="text-center mt-10">Loading Rider profile...</div>;
//   if (error)
//     return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
//   if (!profile)
//     return <div className="text-center mt-10">No profile found</div>;

//   return (
//     <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg border border-gray-200">
//       <div className="flex items-center space-x-6">
//         <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center border-2 border-gray-300">
//           <FaUserCircle className="w-20 h-20 text-gray-500" />
//         </div>
//         <div>
//           <h1 className="text-2xl font-bold">
//             {profile.firstName} {profile.lastName}
//           </h1>
//           <p className="text-gray-600">{profile.email}</p>
//           {profile.address && (
//             <p className="text-gray-600">{profile.address}</p>
//           )}
//         </div>
//       </div>

//       {profile.bio && (
//         <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
//           <h2 className="font-semibold text-gray-700 mb-2">About Me</h2>
//           <p className="text-gray-600">{profile.bio}</p>
//         </div>
//       )}

//       <div className="mt-6 grid grid-cols-2 gap-4">
//         <div className="p-4 bg-green-50 rounded-lg text-center">
//           <p className="text-sm text-gray-500">Rides Completed</p>
//           <p className="font-bold text-lg">1</p>
//         </div>
//         <div className="p-4 bg-blue-50 rounded-lg text-center">
//           <p className="text-sm text-gray-500">Rating</p>
//           <p className="font-bold text-lg">N/A ⭐</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RiderDashboard;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import { useEffect, useState } from "react";
// import { FaUserCircle } from "react-icons/fa";
// import { store } from "@/src/redux/store";
// import {
//   getMemoryAccessToken,
//   setMemoryAccessToken,
// } from "@/src/utils/auth/tokenService";
// import instance from "@/src/helpers/axios/axiosInstance";
// import { RiderProfile } from "@/src/types";
// import toast, { Toaster } from "react-hot-toast";

// const RiderDashboard = () => {
//   const [profile, setProfile] = useState<RiderProfile | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Reset password states
//   const [showReset, setShowReset] = useState(false);
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [resetLoading, setResetLoading] = useState(false);

//   // Fetch Rider profile
//   useEffect(() => {
//     const reduxToken = store.getState().auth.accessToken;
//     if (reduxToken && !getMemoryAccessToken()) setMemoryAccessToken(reduxToken);

//     const fetchProfile = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const res = await instance.get<RiderProfile>("/user/profile/me");
//         setProfile(res.data);
//       } catch (err: any) {
//         console.error("Failed to fetch Rider profile:", err);
//         setError(
//           err.response?.data?.message ||
//             err.message ||
//             "Failed to fetch profile"
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   // Handle reset password
//   const handleResetPassword = async () => {
//     if (!profile) return;

//     setResetLoading(true);

//     try {
//       const res = await instance.post("/auth/reset-without-otp", {
//         email: profile.email,
//         currentPassword,
//         newPassword,
//       });

//       toast.success(res.data?.message || "Password updated successfully");
//       setCurrentPassword("");
//       setNewPassword("");
//       setShowReset(false);
//     } catch (err: any) {
//       console.error("Failed to reset password:", err);
//       toast.error(
//         err.response?.data?.message || err.message || "Failed to reset password"
//       );
//     } finally {
//       setResetLoading(false);
//     }
//   };

//   if (loading)
//     return <div className="text-center mt-10">Loading Rider profile...</div>;
//   if (error)
//     return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
//   if (!profile)
//     return <div className="text-center mt-10">No profile found</div>;

//   return (
//     <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg border border-gray-200">
//       <Toaster position="top-right" />

//       {/* Profile Info */}
//       <div className="flex items-center space-x-6">
//         <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center border-2 border-gray-300">
//           <FaUserCircle className="w-20 h-20 text-gray-500" />
//         </div>
//         <div>
//           <h1 className="text-2xl font-bold">
//             {profile.firstName} {profile.lastName}
//           </h1>
//           <p className="text-gray-600">{profile.email}</p>
//           {profile.address && (
//             <p className="text-gray-600">{profile.address}</p>
//           )}
//         </div>
//       </div>

//       {profile.bio && (
//         <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
//           <h2 className="font-semibold text-gray-700 mb-2">About Me</h2>
//           <p className="text-gray-600">{profile.bio}</p>
//         </div>
//       )}

//       {/* Stats */}
//       <div className="mt-6 grid grid-cols-2 gap-4">
//         <div className="p-4 bg-green-50 rounded-lg text-center">
//           <p className="text-sm text-gray-500">Rides Completed</p>
//           <p className="font-bold text-lg">1</p>
//         </div>
//         <div className="p-4 bg-blue-50 rounded-lg text-center">
//           <p className="text-sm text-gray-500">Rating</p>
//           <p className="font-bold text-lg">N/A ⭐</p>
//         </div>
//       </div>

//       {/* Reset Password Toggle */}
//       <div className="mt-8">
//         <button
//           onClick={() => setShowReset(!showReset)}
//           className="w-full bg-gray-100 text-black p-2 rounded "
//         >
//           {showReset ? "Cancel Password Reset" : "Reset Password"}
//         </button>
//       </div>

//       {/* Reset Password Form */}
//       {showReset && (
//         <div className="mt-4 p-6 bg-gray-50 rounded-lg border border-gray-100">
//           <input
//             type="password"
//             placeholder="Current Password"
//             value={currentPassword}
//             onChange={(e) => setCurrentPassword(e.target.value)}
//             className="w-full p-2 mb-3 border rounded"
//           />
//           <input
//             type="password"
//             placeholder="New Password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             className="w-full p-2 mb-3 border rounded"
//           />
//           <button
//             onClick={handleResetPassword}
//             disabled={resetLoading}
//             className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
//           >
//             {resetLoading ? "Updating..." : "Update Password"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RiderDashboard;

"use client";

import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { store } from "@/src/redux/store";
import {
  getMemoryAccessToken,
  setMemoryAccessToken,
} from "@/src/utils/auth/tokenService";
import instance from "@/src/helpers/axios/axiosInstance";
import { RiderProfile } from "@/src/types";
import toast, { Toaster } from "react-hot-toast";

/* -------------------------------------------------------------
    Rider Dashboard Component
-------------------------------------------------------------- */

const RiderDashboard = () => {
  /* ----------------------------------------
        States
  ---------------------------------------- */
  const [profile, setProfile] = useState<RiderProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  // Reset Password
  const [showReset, setShowReset] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetLoading, setResetLoading] = useState(false);

  // Update Profile
  const [showUpdate, setShowUpdate] = useState(false);
  const [upFirstName, setUpFirstName] = useState("");
  const [upLastName, setUpLastName] = useState("");
  const [upBio, setUpBio] = useState("");
  const [upAddress, setUpAddress] = useState("");
  const [upMobileNumber, setUpMobileNumber] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);

  /* ----------------------------------------
        Fetch Profile
  ---------------------------------------- */
  useEffect(() => {
    const reduxToken = store.getState().auth.accessToken;
    if (reduxToken && !getMemoryAccessToken()) setMemoryAccessToken(reduxToken);

    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await instance.get<RiderProfile>("/user/profile/me");
        setProfile(res.data);

        // Pre-fill update form
        setUpFirstName(res.data.firstName);
        setUpLastName(res.data.lastName);
        setUpBio(res.data.bio || "");
        setUpAddress(res.data.address || "");
        setUpMobileNumber(res.data.mobileNumber || "");
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

  /* ----------------------------------------
        Reset Password Handler
  ---------------------------------------- */
  const handleResetPassword = async () => {
    if (!profile) return;

    setResetLoading(true);

    try {
      const res = await instance.post("/auth/reset-without-otp", {
        email: profile.email,
        currentPassword,
        newPassword,
      });

      toast.success(res.data?.message || "Password updated");
      setCurrentPassword("");
      setNewPassword("");
      setShowReset(false);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to reset password");
    } finally {
      setResetLoading(false);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setPhotoFile(e.target.files[0]);
  };

  /* ----------------------------------------
        Update Profile Handler
  ---------------------------------------- */
  const handleUpdateProfile = async () => {
    if (!profile) return;

    setUpdateLoading(true);

    try {
      const payload = {
        firstName: upFirstName,
        lastName: upLastName,
        bio: upBio,
        address: upAddress,
        mobileNumber: upMobileNumber,
      };

      const res = await instance.patch("/user/profile/update", payload);

      toast.success("Profile updated successfully");
      setShowUpdate(false);

      // Refresh profile
      setProfile((prev) =>
        prev
          ? {
              ...prev,
              ...payload,
            }
          : prev
      );
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setUpdateLoading(false);
    }
  };

  // handle file input

  // const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (!e.target.files || !e.target.files[0]) return;

  //   const file = e.target.files[0];
  //   const formData = new FormData();
  //   formData.append("photo", file);

  //   try {
  //     const res = await instance.patch("/user/profile/update-photo", formData, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });

  //     toast.success("Photo updated");
  //     setProfile((prev) =>
  //       prev ? { ...prev, profilePhoto: res.data.profilePhoto } : prev
  //     );
  //   } catch (err: any) {
  //     toast.error(err.response?.data?.message || "Photo upload failed");
  //   }
  // };

  /* ----------------------------------------
        Delete Profile Handler
  ---------------------------------------- */
  const handleDeleteProfile = async () => {
    if (!confirm("Are you sure you want to delete your profile?")) return;

    try {
      await instance.delete("/user/profile/delete");
      toast.success("Profile deleted");

      // Redirect to login
      window.location.href = "/login";
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to delete profile");
    }
  };

  /* ----------------------------------------
        Render
  ---------------------------------------- */
  if (loading)
    return <div className="text-center mt-10">Loading Rider profile...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
  if (!profile)
    return <div className="text-center mt-10">No profile found</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg border border-gray-200">
      <Toaster position="top-right" />

      {/* ------------------------------------------------
            Profile Header
      ------------------------------------------------ */}
      <div className="flex items-center space-x-6">
        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center border-2 border-gray-300">
          <div className="relative w-20 h-20">
            {profile.profilePhoto ? (
              <img
                src={profile.profilePhoto}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border"
              />
            ) : (
              <FaUserCircle className="w-20 h-20 text-gray-500" />
            )}

            {/* Clickable photo upload */}
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            {profile.firstName} {profile.lastName}
          </h1>
          <p className="text-gray-600">{profile.email}</p>
          {profile.address && (
            <p className="text-gray-600">{profile.mobileNumber}</p>
          )}
        </div>
      </div>

      {/* BIO */}
      {profile.bio && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
          <h2 className="font-semibold text-gray-700 mb-2">About Me</h2>
          <p className="text-gray-600">{profile.bio}</p>
        </div>
      )}

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="p-4 bg-green-50 rounded-lg text-center">
          <p className="text-sm text-gray-500">Rides Completed</p>
          <p className="font-bold text-lg">1</p>
        </div>
        <div className="p-4 bg-blue-50 rounded-lg text-center">
          <p className="text-sm text-gray-500">Contact Number:</p>
          <p className="font-bold text-lg">{profile.mobileNumber}</p>
        </div>
      </div>

      {/* ------------------------------------------------
            ACTION BUTTONS
      ------------------------------------------------ */}

      {/* Update Profile Toggle */}
      <button
        onClick={() => setShowUpdate(!showUpdate)}
        className="w-full mt-6 bg-blue-100 text-blue-800 p-2 rounded"
      >
        {showUpdate ? "Cancel Update" : "Update Profile"}
      </button>

      {/* Reset Password Toggle */}
      <button
        onClick={() => setShowReset(!showReset)}
        className="w-full mt-3 bg-gray-100 text-black p-2 rounded"
      >
        {showReset ? "Cancel Password Reset" : "Reset Password"}
      </button>

      {/* Delete Profile */}
      <button
        onClick={handleDeleteProfile}
        className="w-full mt-3 bg-red-500 text-white p-2 rounded hover:bg-red-600"
      >
        Delete Profile
      </button>

      {/* ------------------------------------------------
            UPDATE PROFILE FORM
      ------------------------------------------------ */}
      {showUpdate && (
        <div className="mt-6 p-6 bg-gray-50 rounded-lg border">
          <h2 className="font-semibold mb-3">Edit Profile</h2>

          <div className="grid grid-cols-2 gap-4">
            <input
              className="border p-2 rounded"
              placeholder="First Name"
              value={upFirstName}
              onChange={(e) => setUpFirstName(e.target.value)}
            />

            <input
              className="border p-2 rounded"
              placeholder="Last Name"
              value={upLastName}
              onChange={(e) => setUpLastName(e.target.value)}
            />
          </div>

          <textarea
            className="border p-2 rounded mt-4 w-full"
            rows={3}
            placeholder="Bio"
            value={upBio}
            onChange={(e) => setUpBio(e.target.value)}
          />

          <input
            className="border p-2 rounded mt-4 w-full"
            placeholder="Address"
            value={upAddress}
            onChange={(e) => setUpAddress(e.target.value)}
          />

          <input
            className="border p-2 rounded mt-4 w-full"
            placeholder="Mobile Number"
            value={upMobileNumber}
            onChange={(e) => setUpMobileNumber(e.target.value)}
          />

          <button
            onClick={handleUpdateProfile}
            disabled={updateLoading}
            className="w-full bg-blue-600 text-white p-2 rounded mt-5"
          >
            {updateLoading ? "Updating..." : "Save Changes"}
          </button>
        </div>
      )}

      {/* ------------------------------------------------
            RESET PASSWORD FORM
      ------------------------------------------------ */}
      {showReset && (
        <div className="mt-6 p-6 bg-gray-50 rounded-lg border">
          <h2 className="font-semibold mb-3">Reset Password</h2>

          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full p-2 mb-3 border rounded"
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 mb-3 border rounded"
          />

          <button
            onClick={handleResetPassword}
            disabled={resetLoading}
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            {resetLoading ? "Updating..." : "Update Password"}
          </button>
        </div>
      )}
    </div>
  );
};

export default RiderDashboard;
