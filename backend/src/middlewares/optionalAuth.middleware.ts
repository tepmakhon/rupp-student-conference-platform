import { type Request, type Response, type NextFunction } from "express";
import { authMiddleware } from "./auth.middleware.js";

export const optionalAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization) return authMiddleware(req, res, next);
  next();
};
