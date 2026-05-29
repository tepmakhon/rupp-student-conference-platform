import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware.js";

export const authorize = (...allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const role = req.user?.roleName;

    if (!role) {
      return res.status(403).json({ message: "Role missing" });
    }

    if (!allowedRoles.includes(role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
};