import { Router } from "express";

import { authMiddleware }
from "../../middlewares/auth.middleware.js";

import {
  getNotifications,
  readNotification,
  readAllNotifications,
} from "./notification.controller.js";

const router = Router();

router.get(
  "/",
  authMiddleware,
  getNotifications
);

router.patch(
  "/:id/read",
  authMiddleware,
  readNotification
);

router.patch(
  "/read-all",
  authMiddleware,
  readAllNotifications
);

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: User Notification APIs
 */

/**
 * @swagger
 * /api/notifications:
 *   get:
 *     summary: Get My Notifications
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         example: 10
 *     responses:
 *       200:
 *         description: Notifications retrieved successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/notifications/{id}/read:
 *   patch:
 *     summary: Mark Notification As Read
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notification marked as read
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Notification not found
 */

/**
 * @swagger
 * /api/notifications/read-all:
 *   patch:
 *     summary: Mark All Notifications As Read
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All notifications marked as read
 *       401:
 *         description: Unauthorized
 */

export default router;