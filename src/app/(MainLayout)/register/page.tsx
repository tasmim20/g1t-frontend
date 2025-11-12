/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSignupMutation } from "@/src/redux/api/authApi/authApi";

export enum Role {
  RIDER = "RIDER",
  DRIVER = "DRIVER",
}

export interface Rider {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  password: string;
  role: Role;
  photo?: string;
  isConfirmed?: boolean;
}

export interface Driver extends Rider {
  drivingLicense: string;
  role: Role.DRIVER;
}

// Validation schema
const validationSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email("Enter a valid email"),
  mobileNumber: z.string().min(10, "Enter a valid mobile number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum([Role.RIDER, Role.DRIVER]),
  drivingLicense: z.string().optional(), // Required if role=DRIVER
});

type FormValues = Rider & { drivingLicense?: string };

const RegisterPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(validationSchema),
  });

  const selectedRole = watch("role");
  const router = useRouter();

  const [signup, { isLoading }] = useSignupMutation();
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setRegisterError(null);

    // If DRIVER, ensure drivingLicense is provided
    if (data.role === Role.DRIVER && !data.drivingLicense) {
      setRegisterError("Driving license is required for drivers.");
      return;
    }

    try {
      const res: any = await signup(data).unwrap();

      if (res?.message?.includes("registered successfully")) {
        toast.success(
          "Successfully registered! Please check your email for the confirmation link."
        );
        setEmailSent(true);
      } else {
        throw new Error(res.message || "Registration failed");
      }
    } catch (err: any) {
      setRegisterError(err.message || "Registration failed");
    }
  };

  const handleEmailConfirmation = () => {
    router.push("/login");
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-2xl p-6 mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("firstName")}
          placeholder="First Name"
          className="w-full border p-2 rounded"
        />
        {errors.firstName && (
          <p className="text-red-500 text-sm">{errors.firstName.message}</p>
        )}

        <input
          {...register("lastName")}
          placeholder="Last Name"
          className="w-full border p-2 rounded"
        />
        {errors.lastName && (
          <p className="text-red-500 text-sm">{errors.lastName.message}</p>
        )}

        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        <input
          {...register("mobileNumber")}
          placeholder="Mobile Number"
          className="w-full border p-2 rounded"
        />
        {errors.mobileNumber && (
          <p className="text-red-500 text-sm">{errors.mobileNumber.message}</p>
        )}

        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <input
          {...register("photo")}
          placeholder="Photo URL (optional)"
          className="w-full border p-2 rounded"
        />

        <select {...register("role")} className="w-full border p-2 rounded">
          <option value="">Select Role</option>
          <option value={Role.RIDER}>Rider</option>
          <option value={Role.DRIVER}>Driver</option>
        </select>
        {errors.role && (
          <p className="text-red-500 text-sm">{errors.role.message}</p>
        )}

        {selectedRole === Role.DRIVER && (
          <input
            {...register("drivingLicense")}
            placeholder="Driving License Number"
            className="w-full border p-2 rounded"
          />
        )}

        {registerError && (
          <p className="text-red-600 text-center mt-2">{registerError}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>

      {emailSent && (
        <div className="mt-4 text-center">
          <p className="text-green-600">
            Please check your email for the confirmation link!
          </p>
          <button
            onClick={handleEmailConfirmation}
            className="text-blue-600 underline"
          >
            Go to Login
          </button>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
