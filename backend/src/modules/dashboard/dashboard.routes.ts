import { Router } from "express";

import { authMiddleware }
from "../../middlewares/auth.middleware.js";

import { rbac }
from "../../middlewares/rbac.middleware.js";

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

router.get(
  "/admin",
  authMiddleware,
  rbac(["ADMIN"]),
  adminDashboard
);

/*
|--------------------------------------------------------------------------
| ORGANIZATION
|--------------------------------------------------------------------------
*/

router.get(
  "/organization",
  authMiddleware,
  rbac(["ORGANIZATION"]),
  organizationDashboard
);

/*
|--------------------------------------------------------------------------
| STUDENT
|--------------------------------------------------------------------------
*/

router.get(
  "/student",
  authMiddleware,
  rbac(["STUDENT"]),
  studentDashboard
);

/**
 * @swagger
 * /api/dashboard:
 *   get:
 *     summary: Dashboard Analytics
 *     tags:
 *       - Dashboard
 */

export default router;