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
 *     summary: Upload Organization Logo
 *     tags: [Organizations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logo updated
 */

export default router;