import { Router } from "express";

import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { rbac } from "../../middlewares/rbac.middleware.js";

const router = Router();

router.get(
  "/dashboard",
  authMiddleware,
  rbac(["STUDENT"]),
  (req, res) => {
    res.json({
      message: "Student Dashboard",
      user: (req as any).user,
    });
  }
);

export default router;