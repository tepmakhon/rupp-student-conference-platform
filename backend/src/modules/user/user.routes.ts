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

const router =
  express.Router();

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
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Profile created successfully
 *       400:
 *         description: Bad request
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
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
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