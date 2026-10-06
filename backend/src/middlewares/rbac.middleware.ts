import { Request, Response, NextFunction } from "express";

export const rbac = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!allowedRoles.some((role) => role === user.roleName)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: RBAC blocked",
      });
    }

    next();
  };
};
