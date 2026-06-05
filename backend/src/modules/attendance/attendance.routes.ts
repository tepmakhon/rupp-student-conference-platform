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
 * tags:
 *   name: Attendance
 *   description: Attendance Management APIs
 */

/**
 * @swagger
 * /api/attendance/checkin/{eventId}:
 *   post:
 *     summary: Check in to an event
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Check-in successful
 *       400:
 *         description: Invalid request or already checked in
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Event registration not found
 */

export default router;