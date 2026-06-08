import express from "express";

import {
  createProfile,
  getMyProfile,
  updateMyProfile,
} from "./user.controller.js";

import { authMiddleware }
from "../../middlewares/auth.middleware.js";

import { rbac }
from "../../middlewares/rbac.middleware.js";

import { successResponse }
from "../../utils/apiResponse.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User Profile APIs
 */

/**
 * @swagger
 * /api/users/admin-only:
 *   get:
 *     tags:
 *       - Users
 *     summary: Admin-only test endpoint
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Welcome Admin
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get(
  "/admin-only",
  authMiddleware,
  rbac(["ADMIN"]),
  (req, res) => {
    return successResponse(
      res,
      null,
      "Welcome Admin"
    );
  }
);

/**
 * @swagger
 * /api/users/profile:
 *   post:
 *     tags:
 *       - Users
 *     summary: Create user profile
 *     description: Create profile information for the authenticated user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: Tep MakHon
 *               phoneNumber:
 *                 type: string
 *                 example: "012345678"
 *               gender:
 *                 type: string
 *                 example: Male
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 example: "2003-08-15"
 *               bio:
 *                 type: string
 *                 example: Computer Science Student at RUPP
 *               profileImageUrl:
 *                 type: string
 *                 example: /uploads/profile.jpg
 *     responses:
 *       201:
 *         description: Profile created successfully
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/profile",
  authMiddleware,
  createProfile
);

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get my profile
 *     description: Retrieve authenticated user's profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Profile not found
 */
router.get(
  "/profile",
  authMiddleware,
  getMyProfile
);

/**
 * @swagger
 * /api/users/profile:
 *   put:
 *     tags:
 *       - Users
 *     summary: Update my profile
 *     description: Update authenticated user's profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: Tep MakHon
 *               phoneNumber:
 *                 type: string
 *                 example: "012345678"
 *               gender:
 *                 type: string
 *                 example: MALE
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 example: "2003-01-23T00:00:00.000Z"
 *               bio:
 *                 type: string
 *                 example: Full Stack Developer
 *               profileImageUrl:
 *                 type: string
 *                 example: /uploads/profile.jpg
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Profile not found
 */
router.put(
  "/profile",
  authMiddleware,
  updateMyProfile
);

export default router;