import { Router } from "express";

import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { rbac } from "../../middlewares/rbac.middleware.js";
import {
  getMyHistory,
  createProfile,
  getMyProfile,
  getPublicProfile,
} from "./student.controller.js";
const router = Router();
/**
 * @swagger
 * tags:
 *   name: Students
 *   description: Student APIs
 */


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

/**
 * @swagger
 * /api/students/dashboard:
 *   get:
 *     summary: Student Dashboard
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Student dashboard retrieved
 */

 /**
 * @swagger
 * /api/students/history:
 *   get:
 *     summary: Get Activity Score History
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Activity score history retrieved
 */

router.get(
  "/history",
  authMiddleware,
  rbac(["STUDENT"]),
  getMyHistory
);
/**
 * @swagger
 * /api/students/profile:
 *   post:
 *     summary: Create Student Profile
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               universityId:
 *                 type: string
 *               facultyId:
 *                 type: string
 *               majorId:
 *                 type: string
 *               academicYear:
 *                 type: string
 *     responses:
 *       201:
 *         description: Student profile created
 */

router.post(
  "/profile",
  authMiddleware,
  rbac(["STUDENT"]),
  createProfile
);
/**
 * @swagger
 * /api/students/profile:
 *   get:
 *     summary: Get My Profile
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Student profile retrieved
 */

router.get(
  "/profile",
  authMiddleware,
  rbac(["STUDENT"]),
  getMyProfile
);
/**
 * @swagger
 * /api/students/profile:
 *   get:
 *     summary: Get My Profile
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 */

router.get(
  "/:id/public",
  authMiddleware,
  getPublicProfile
);
/**
 * @swagger
 * /api/students/{id}/public:
 *   get:
 *     summary: Get Student Public Profile
 *     tags: [Students]
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
 *         description: Student profile retrieved
 */

export default router;