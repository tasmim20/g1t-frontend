"use client";

import React from "react";
import {
  FieldValues,
  UseFormRegister,
  FieldErrors,
  Path,
} from "react-hook-form";

interface InputProps<T extends FieldValues> {
  name: Path<T>; // ✅ use Path<T> instead of keyof T
  label?: string;
  placeholder?: string;
  type?: string;
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
}

const Input = <T extends FieldValues>({
  name,
  label,
  placeholder,
  type = "text",
  register,
  errors,
}: InputProps<T>) => (
  <div className="mb-4">
    {label && <label className="block text-sm font-medium mb-1">{label}</label>}
    <input
      type={type}
      placeholder={placeholder}
      {...register(name)}
      className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {errors?.[name] && (
      <p className="text-red-500 text-sm mt-1">
        {errors[name]?.message?.toString()}
      </p>
    )}
  </div>
);

export default Input;
