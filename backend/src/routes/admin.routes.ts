import express from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/rbac.middleware.js";

const router = express.Router();

/**
 * ADMIN DASHBOARD
 */
router.get(
  "/dashboard",
  authenticate,
  authorize("ADMIN"),
  (req, res) => {
    res.json({
      message: "Admin dashboard access granted",
    });
  }
);

/**
 * MANAGE USERS
 */
router.get(
  "/users",
  authenticate,
  authorize("ADMIN"),
  (req, res) => {
    res.json({
      message: "User management panel",
    });
  }
);

export default router;