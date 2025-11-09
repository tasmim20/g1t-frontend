export const Role = {
  ADMIN: "ADMIN",
  DRIVER: "DRIVER",
  USER: "USER",
} as const;

export type Role = (typeof Role)[keyof typeof Role]; // "ADMIN" | "DRIVER" | "RIDER"
