import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const generateToken = (payload: object) => {
  const secret: jwt.Secret = env.JWT_SECRET as unknown as jwt.Secret;
  return jwt.sign(payload, secret, {
    expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
  });
};

export const verifyToken = (token: string) => {
  const secret: jwt.Secret = env.JWT_SECRET as unknown as jwt.Secret;
  return jwt.verify(token, secret);
};