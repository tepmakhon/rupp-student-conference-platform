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
 *     summary: Get All Users
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/admin/users/{id}/status:
 *   patch:
 *     summary: Update User Status
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
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
 *     summary: Get System Statistics
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: System statistics
 */


export default router;