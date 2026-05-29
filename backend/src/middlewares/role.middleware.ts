import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware.js";

export const authorize = (...allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const userRole = req.user?.roleName;

    if (!userRole) {
      return res.status(403).json({ message: "Role not found" });
    }

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
};