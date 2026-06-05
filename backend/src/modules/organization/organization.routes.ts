import { Router } from "express";

import { authMiddleware }
from "../../middlewares/auth.middleware.js";

import { rbac }
from "../../middlewares/rbac.middleware.js";

import {
  getOrganizationProfile,
  updateLogo,
} from "./organization.controller.js";

const router = Router();

router.get(
  "/me",
  authMiddleware,
  rbac(["ORGANIZATION"]),
  getOrganizationProfile
);

router.patch(
  "/logo",
  authMiddleware,
  rbac(["ORGANIZATION"]),
  updateLogo
);

/**
 * @swagger
 * tags:
 *   name: Organizations
 *   description: Organization APIs
 */

/**
 * @swagger
 * /api/organizations/me:
 *   get:
 *     summary: Get My Organization
 *     tags: [Organizations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Organization found
 */

/**
 * @swagger
 * /api/organizations/logo:
 *   patch:
 *     summary: Update Organization Logo
 *     tags: [Organizations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               logoUrl:
 *                 type: string
 *                 example: https://example.com/logo.png
 *     responses:
 *       200:
 *         description: Logo updated successfully
 *       400:
 *         description: Organization not found or invalid data
 *       401:
 *         description: Unauthorized
 */

export default router;