import express from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/rbac.middleware.js";

const router = express.Router();

/**
 * STUDENT DASHBOARD
 */
router.get(
  "/dashboard",
  authenticate,
  authorize("STUDENT"),
  (req, res) => {
    res.json({
      message: "Student dashboard loaded",
    });
  }
);

/**
 * VIEW PROFILE
 */
router.get(
  "/profile",
  authenticate,
  authorize("STUDENT"),
  (req, res) => {
    res.json({
      message: "Student profile data",
    });
  }
);

export default router;