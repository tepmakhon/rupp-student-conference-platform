import { Router } from "express";

import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { rbac } from "../../middlewares/rbac.middleware.js";
import { getMyHistory } from "./student.controller.js";

const router = Router();

router.get(
  "/dashboard",
  authMiddleware,
  rbac(["STUDENT"]),
  (req, res) => {
    res.json({
      message: "Student Dashboard",
      user: (req as any).user,
    });
  }
);

router.get(
  "/history",
  authMiddleware,
  rbac(["STUDENT"]),
  getMyHistory
);

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: Student APIs
 */

/**
 * @swagger
 * /api/students/profile:
 *   post:
 *     summary: Create Student Profile
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/students/profile:
 *   get:
 *     summary: Get My Profile
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 */

export default router;