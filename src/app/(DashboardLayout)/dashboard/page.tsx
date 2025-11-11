"use client";
import { RootState } from "@/src/redux/store";
import { CustomJwtPayload } from "@/src/types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// Adjust based on your types

const ProfilePage = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken); // Retrieve token from Redux store
  const [userProfile, setUserProfile] = useState<CustomJwtPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!accessToken) {
      setError("No access token found.");
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`, // Send the token in Authorization header
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        setUserProfile(data); // Set profile data if fetched successfully
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message); // Accessing the error message if it's an instance of Error
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [accessToken]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>User Profile</h1>
      {userProfile ? (
        <div>
          <p>Name: {userProfile?.email}</p>
          <p>Role: {userProfile?.role}</p>
          {/* You can also add a profile picture or other details */}
        </div>
      ) : (
        <p>No profile found</p>
      )}
    </div>
  );
};

export default ProfilePage;
