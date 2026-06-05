import { Router } from "express";

import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { rbac } from "../../middlewares/rbac.middleware.js";

import {
  getAuditLogs,
  getMyAuditLogs,
} from "./audit.controller.js";

const router = Router();

router.get(
  "/",
  authMiddleware,
  rbac(["ADMIN"]),
  getAuditLogs
);

router.get(
  "/me",
  authMiddleware,
  getMyAuditLogs
);

/**
 * @swagger
 * tags:
 *   name: Audit
 *   description: Audit Log Management APIs
 */

/**
 * @swagger
 * /api/audit:
 *   get:
 *     summary: Get all audit logs
 *     tags: [Audit]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Audit logs retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 */

/**
 * @swagger
 * /api/audit/me:
 *   get:
 *     summary: Get my audit logs
 *     tags: [Audit]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: User audit logs retrieved successfully
 *       401:
 *         description: Unauthorized
 */

export default router;