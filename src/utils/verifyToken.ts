import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  exp: number;
  iat: number;
  email?: string;
  role?: string;
  id?: number;
}

export const verifyToken = (token: string): DecodedToken =>
  jwtDecode<DecodedToken>(token);

export const getTokenExpiry = (token: string): number => {
  const decoded = verifyToken(token);
  return decoded.exp - decoded.iat;
};
