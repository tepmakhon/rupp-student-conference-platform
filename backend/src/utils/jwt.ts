import jwt, { type SignOptions } from "jsonwebtoken";
import { env } from "../config/env.js";
import { AppError } from "./AppError.js";

export interface AuthClaims {
  id: string;
  email: string;
  roleId: string;
  roleName: string;
}

export const signToken = (payload: AuthClaims) =>
  jwt.sign(payload, env.JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"],
  });

export const verifyToken = (token: string): AuthClaims => {
  const payload = jwt.verify(token, env.JWT_SECRET, { algorithms: ["HS256"] });
  if (typeof payload === "string" ||
      typeof payload.exp !== "number" ||
      !/^[1-9]\d*$/.test(payload.id) ||
      !/^[1-9]\d*$/.test(payload.roleId) ||
      typeof payload.email !== "string" ||
      !["STUDENT", "ORGANIZATION", "ADMIN"].includes(payload.roleName)) {
    throw new AppError("Invalid token", 401);
  }
  return { id: payload.id, email: payload.email, roleId: payload.roleId, roleName: payload.roleName };
};
