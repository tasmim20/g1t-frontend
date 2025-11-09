// "use server";

// import { UserData } from "@/src/types";

// export const registerUser = async (data: UserData) => {
//   const res = await fetch(`http://localhost:5000/auth/register`, {
//     method: "POST",
//     headers: {
//       "content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//     cache: "no-store",
//   });
//   // const userInfo = await res.json();
//   // return userInfo;
//   return res.json();
// };

"use server";

// import { UserData } from "@/src/types";

// export const registerUser = async (data: UserData) => {
//   try {
//     // Get the backend URL from the environment variable
//     const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

//     console.log("Backend URL:", backendUrl); // Check if the URL is correct

//     // Ensure that the environment variable is available
//     if (!backendUrl) {
//       throw new Error("Backend URL is not defined in the .env file");
//     }

//     const res = await fetch(`${backendUrl}/auth/register`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json", // Corrected header
//       },
//       body: JSON.stringify(data),
//     });

//     // Check if the response is successful (status 200-299)
//     if (!res.ok) {
//       // Log the error response for better debugging
//       const errorResponse = await res.text(); // Get the response body as text
//       console.error("Error Response:", errorResponse); // Log the error
//       throw new Error("Failed to register user");
//     }

//     const userInfo = await res.json(); // Parse the JSON from the response
//     return userInfo; // Return the parsed user info
//   } catch (error) {
//     // Handle error (e.g., network issues, bad response)
//     console.error("Registration Error:", error);
//     throw error; // Rethrow the error or handle it as per your requirement
//   }
// };

"use server";

import { UserData } from "@/src/types";

type RegisterResponse = {
  message: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
};

export const registerUser = async (
  data: UserData
): Promise<RegisterResponse> => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendUrl) throw new Error("Backend URL is not defined in .env file");

  try {
    if (process.env.NODE_ENV !== "production") {
      console.log("Backend URL:", backendUrl);
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(`${backendUrl}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) {
      const errorResponse = await res.json().catch(() => null);
      const message =
        errorResponse?.message || `Registration failed (${res.status})`;
      throw new Error(message);
    }

    const userInfo: RegisterResponse = await res.json();
    return userInfo;
  } catch (error) {
    console.error("Registration Error:", error);
    throw error;
  }
};
