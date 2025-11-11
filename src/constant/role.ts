export const Role = {
  ADMIN: "ADMIN",
  DRIVER: "DRIVER",
  RIDER: "RIDER",
} as const;

export type Role = (typeof Role)[keyof typeof Role]; // "ADMIN" | "DRIVER" | "RIDER"
