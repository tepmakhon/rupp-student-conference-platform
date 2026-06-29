import { Router } from "express";

import { authMiddleware } from "../../middlewares/auth.middleware.js";

import { rbac } from "../../middlewares/rbac.middleware.js";

import {
  adminDashboard,
  organizationDashboard,
  studentDashboard,
} from "./dashboard.controller.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| ADMIN
|--------------------------------------------------------------------------
*/

router.get("/admin", authMiddleware, rbac(["ADMIN"]), adminDashboard);

/*
|--------------------------------------------------------------------------
| ORGANIZATION
|--------------------------------------------------------------------------
*/

router.get(
  "/organization",
  authMiddleware,
  rbac(["ORGANIZATION"]),
  organizationDashboard,
);

/*
|--------------------------------------------------------------------------
| STUDENT
|--------------------------------------------------------------------------
*/

router.get("/student", authMiddleware, rbac(["STUDENT"]), studentDashboard);

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Dashboard Analytics APIs
 */

/**
 * @swagger
 * /api/dashboard/admin:
 *   get:
 *     summary: Admin dashboard statistics
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin dashboard data retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 */

/**
 * @swagger
 * /api/dashboard/organization:
 *   get:
 *     summary: Organization dashboard statistics
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Organization dashboard data retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Organization access required
 */

/**
 * @swagger
 * /api/dashboard/student:
 *   get:
 *     summary: Student dashboard statistics
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Student dashboard data retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Student access required
 */

export default router;
