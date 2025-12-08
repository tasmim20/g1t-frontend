/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import toast from "react-hot-toast";
// keep using RiderProfile type
import { useUpdateProfileMutation } from "@/src/redux/api/authApi/authApi";
import { DriverProfile } from "@/src/types";

interface Props {
  profile: DriverProfile;
  onUpdate: (updated: Partial<DriverProfile>) => void;
  onClose: () => void;
}

export default function UpdateDriverProfile({
  profile,
  onUpdate,
  onClose,
}: Props) {
  // Driver cannot update profile photo
  const [firstName, setFirstName] = useState(profile.firstName || "");
  const [lastName, setLastName] = useState(profile.lastName || "");
  const [bio, setBio] = useState(profile.bio || "");
  const [address, setAddress] = useState(profile.address || "");
  const [mobileNumber, setMobileNumber] = useState(profile.mobileNumber || "");
  const [loading, setLoading] = useState(false);

  const [updateProfile] = useUpdateProfileMutation();

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("bio", bio || "");
      formData.append("address", address || "");
      formData.append("mobileNumber", mobileNumber || "");
      // profilePhoto is NOT appended for Driver

      console.log("Updating driver profile with FormData:", formData);

      const updatedProfile: any = await updateProfile(formData).unwrap();

      console.log("Updated profile response:", updatedProfile);

      toast.success("Profile updated successfully");

      onUpdate(updatedProfile);
      onClose();
    } catch (err: any) {
      console.error("Driver profile update error:", err);
      toast.error(err?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 p-6 bg-gray-50 rounded-lg border">
      <h2 className="font-semibold mb-3 text-lg">Edit Driver Profile</h2>

      {/* Name Fields */}
      <div className="grid grid-cols-2 gap-4">
        <input
          className="p-2 border rounded border-gray-400"
          value={firstName}
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          className="p-2 border rounded border-gray-400"
          value={lastName}
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      {/* Bio */}
      <textarea
        className="border rounded border-gray-400 p-2 mt-4 w-full"
        rows={3}
        value={bio}
        placeholder="Bio"
        onChange={(e) => setBio(e.target.value)}
      />

      {/* Address and Mobile */}
      <input
        className="border rounded border-gray-400 p-2 mt-4 w-full"
        value={address}
        placeholder="Address"
        onChange={(e) => setAddress(e.target.value)}
      />
      <input
        className="border rounded border-gray-400 p-2 mt-4 w-full"
        value={mobileNumber}
        placeholder="Mobile Number"
        onChange={(e) => setMobileNumber(e.target.value)}
      />

      <button
        onClick={handleUpdate}
        disabled={loading}
        className="w-full bg-sky-600 text-white p-2 rounded mt-5"
      >
        {loading ? "Updating..." : "Save Changes"}
      </button>
    </div>
  );
}
