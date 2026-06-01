import { Router } from "express";

import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { rbac } from "../../middlewares/rbac.middleware.js";

import { checkIn } from "./attendance.controller.js";

const router = Router();

router.post(
  "/checkin/:eventId",
  authMiddleware,
  rbac(["STUDENT"]),
  checkIn
);

/**
 * @swagger
 * /api/attendance/checkin/{eventId}:
 *   post:
 *     summary: Check In Event
 *     tags:
 *       - Attendance
 */

export default router;