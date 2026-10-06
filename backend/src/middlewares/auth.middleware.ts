import { AppError } from "../utils/AppError.js";
import { type Request, type Response, type NextFunction } from "express";
import { authenticateToken } from "../utils/authUser.js";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const match = req.headers.authorization?.match(/^Bearer (\S+)$/);
  if (!match) return res.status(401).json({ success: false, message: "Bearer token required" });
  try {
    req.user = await authenticateToken(match[1]);
    next();
  } catch (error) {
    if (error instanceof AppError && error.statusCode === 401) {
      return res.status(401).json({ success: false, message: "Invalid or inactive session" });
    }
    next(error);
  }
};
