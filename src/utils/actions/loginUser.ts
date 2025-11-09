/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

interface LoginData {
  email: string;
  password: string;
}

export const loginUser = async (data: LoginData) => {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!backendUrl) throw new Error("Backend URL not configured.");

    const res = await fetch(`${backendUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const responseData = await res.json().catch(() => null);

    if (!res.ok) {
      const message =
        responseData?.message || `Login failed with status ${res.status}`;
      throw new Error(message);
    }

    return {
      success: true,
      message: responseData?.message,
      token: responseData?.token, // JWT if backend provides
      user: responseData?.user,
    };
  } catch (error: any) {
    console.error("Login Error:", error);
    throw new Error(error.message || "Unable to login");
  }
};
