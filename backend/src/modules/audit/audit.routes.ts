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
 * /api/audit:
 *   get:
 *     summary: Audit Logs
 *     tags:
 *       - Audit
 */

export default router;