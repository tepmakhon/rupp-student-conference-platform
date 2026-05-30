import { Router } from "express";

import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { rbac } from "../../middlewares/rbac.middleware.js";

const router = Router();

router.get(
  "/dashboard",
  authMiddleware,
  rbac(["ORGANIZATION"]),
  (req, res) => {
    res.json({
      message: "Organization Dashboard",
      user: (req as any).user,
    });
  }
);

export default router;