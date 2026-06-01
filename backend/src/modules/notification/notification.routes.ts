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
 * /api/notifications:
 *   get:
 *     summary: My Notifications
 *     tags:
 *       - Notifications
 */

export default router;