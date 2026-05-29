import express from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/rbac.middleware.js";

const router = express.Router();

/**
 * CREATE EVENT
 */
router.post(
  "/event",
  authenticate,
  authorize("ORGANIZATION"),
  (req, res) => {
    res.json({
      message: "Event created successfully",
    });
  }
);

/**
 * CREATE OPPORTUNITY
 */
router.post(
  "/opportunity",
  authenticate,
  authorize("ORGANIZATION"),
  (req, res) => {
    res.json({
      message: "Opportunity created successfully",
    });
  }
);

export default router;