/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { RiderProfile } from "@/src/types";
import { useUpdateProfileMutation } from "@/src/redux/api/authApi/authApi";

interface Props {
  profile: RiderProfile;
  onUpdate: (updated: Partial<RiderProfile>) => void;
  onClose: () => void;
}

export default function UpdateProfile({ profile, onUpdate, onClose }: Props) {
  const [firstName, setFirstName] = useState(profile.firstName || "");
  const [lastName, setLastName] = useState(profile.lastName || "");
  const [bio, setBio] = useState(profile.bio || "");
  const [address, setAddress] = useState(profile.address || "");
  const [mobileNumber, setMobileNumber] = useState(profile.mobileNumber || "");
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState(profile.profilePhoto || "");
  const [loading, setLoading] = useState(false);

  const canUpdatePhoto = profile.role === "RIDER";
  const [updateProfile] = useUpdateProfileMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!canUpdatePhoto) {
      toast.error("Only Riders can update profile photo");
      return;
    }
    const file = e.target.files?.[0];
    if (file) {
      setProfilePhoto(file);
      setPreview(URL.createObjectURL(file));
      console.log("Selected new photo:", file);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("firstName", firstName || profile.firstName);
      formData.append("lastName", lastName || profile.lastName);
      formData.append("bio", bio || profile.bio || "");
      formData.append("address", address || profile.address || "");
      formData.append(
        "mobileNumber",
        mobileNumber || profile.mobileNumber || ""
      );

      // Handle photo: send new file if selected, else send existing URL
      if (canUpdatePhoto && profilePhoto) {
        formData.append("profilePhoto", profilePhoto);
        console.log("Uploading new profile photo");
      } else if (profile.profilePhoto) {
        formData.append("profilePhoto", profile.profilePhoto);
        console.log("Sending existing profile photo URL");
      }

      // RTK Query call
      const updatedProfile: any = await updateProfile(formData).unwrap();

      //   console.log("Updated profile response:", updatedProfile);

      toast.success("Profile updated successfully");
      onUpdate(updatedProfile);
      onClose();
      onUpdate({
        firstName: firstName || profile.firstName,
        lastName: lastName || profile.lastName,
        bio: bio || profile.bio || "",
        address: address || profile.address || "",
        mobileNumber: mobileNumber || profile.mobileNumber || "",
        profilePhoto: profilePhoto ? preview : profile.profilePhoto,
      });

      onClose();
    } catch (err: any) {
      console.error("Profile update error:", err);
      toast.error(err?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 p-6 bg-gray-50 rounded-lg border">
      <h2 className="font-semibold mb-3 text-lg">Edit Profile</h2>

      {/* Profile Photo */}
      {canUpdatePhoto && (
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 flex justify-center items-center">
            {preview ? (
              <img
                src={preview}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-400">No Photo</span>
            )}
          </div>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>
      )}

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
