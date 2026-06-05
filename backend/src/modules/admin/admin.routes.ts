import { Router } from "express";

import { authMiddleware } from "../../middlewares/auth.middleware.js";

import { rbac } from "../../middlewares/rbac.middleware.js";

import {

  getSystemStatsController,

} from "./admin.controller.js";

const router = Router();

router.get(
  "/dashboard",
  authMiddleware,
  rbac(["ADMIN"]),
  (req, res) => {
    res.json({
      message: "Admin Dashboard",
      user: (req as any).user,
    });
  }
);

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin APIs
 */

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve all registered users.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /api/admin/users/{id}/status:
 *   patch:
 *     summary: Update user status
 *     description: Activate, suspend, or update a user's account status.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User status updated
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: User not found
 */

router.get(
  "/stats",
  authMiddleware,
  rbac(["ADMIN"]),
  getSystemStatsController
);
/**
 * @swagger
 * /api/admin/stats:
 *   get:
 *     summary: Get system statistics
 *     description: Returns platform statistics for administrators.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Statistics retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 */


export default router;