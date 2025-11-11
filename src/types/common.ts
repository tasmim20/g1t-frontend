/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconType } from "react-icons";
import { Role } from "../constant/role";

// export type UserRole = keyof typeof Role;

export interface DrawerItem {
  title: string;
  path: string;
  parentPath?: string;
  icon?: IconType;
  child?: DrawerItem[];
}

// types/index.ts or wherever your types are

export interface IMeta {
  total?: number; // total items
  page?: number; // current page
  pageSize?: number; // items per page
  totalPages?: number; // total pages
  [key: string]: any; // any extra metadata
}

export type ResponseSuccessType = {
  data: any;
  meta?: IMeta;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessage: IGenericErrorMessage[];
};
export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export type UserData = {
  name: string;
  image: string;
  userName: string;
  email: string;
  password: string;
};
export type FormValues = {
  email: string;
  password: string;
};

export interface SignupDto {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  password: string;
  role: Role; // "USER" | "DRIVER" | "ADMIN"
  drivingLicense?: string; // Only required if role is DRIVER
  photo?: string; // Optional profile photo URL
}
export interface Rider {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  role: Role; // USER or ADMIN
  photo?: string; // URL of uploaded photo
  isConfirmed: boolean;
  otp?: string;
  otpExpiry?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Driver extends Rider {
  drivingLicense: string;
  role: typeof Role.DRIVER;
}

export interface CustomJwtPayload {
  name?: string;
  email?: string;
  role?: string;
}
