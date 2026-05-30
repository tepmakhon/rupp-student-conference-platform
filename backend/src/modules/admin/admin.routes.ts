import { Router } from "express";

import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { rbac } from "../../middlewares/rbac.middleware.js";

const router = Router();

router.get(
  "/dashboard",
  authMiddleware,
  rbac(["ADMIN"]),
  (req, res) => {
    res.json({
      message: "Admin Dashboard",
      user: (req as any).user,
    });
  }
);

export default router;