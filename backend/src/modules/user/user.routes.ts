import express from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { rbac } from "../../middlewares/rbac.middleware.js";

const router = express.Router();

router.get(
  "/admin-only",
  authMiddleware,
  rbac(["ADMIN"]),
  (req, res) => {
    res.json({ message: "Welcome Admin" });
  }
);

export default router;