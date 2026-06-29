import { Router } from "express";

import { authMiddleware } from "../../middlewares/auth.middleware.js";

import { rbac } from "../../middlewares/rbac.middleware.js";

import {
  getMyApplications,
  getApplicants,
  updateStatus,
} from "./application.controller.js";

import { validate } from "../../middlewares/validate.middleware.js";

import { updateApplicationStatusSchema } from "./application.validation.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| STUDENT
|--------------------------------------------------------------------------
*/

router.get("/me", authMiddleware, rbac(["STUDENT"]), getMyApplications);

/*
|--------------------------------------------------------------------------
| ORGANIZATION
|--------------------------------------------------------------------------
*/

router.get(
  "/opportunity/:id",
  authMiddleware,
  rbac(["ORGANIZATION"]),
  getApplicants,
);

router.patch(
  "/:id/status",
  authMiddleware,
  rbac(["ORGANIZATION"]),
  validate(updateApplicationStatusSchema),
  updateStatus,
);

/**
 * @swagger
 * tags:
 *   name: Applications
 *   description: Application Management APIs
 */

/**
 * @swagger
 * /api/applications/me:
 *   get:
 *     summary: Get my applications
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         example: 10
 *     responses:
 *       200:
 *         description: Applications retrieved successfully
 */

/**
 * @swagger
 * /api/applications/opportunity/{id}:
 *   get:
 *     summary: Get applicants for an opportunity
 *     tags: [Applications]
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
 *         description: Applicants retrieved successfully
 */

/**
 * @swagger
 * /api/applications/{id}/status:
 *   patch:
 *     summary: Update application status
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum:
 *                    - PENDING
 *                    - REVIEWING
 *                    - ACCEPTED
 *                    - REJECTED
 *                 example: ACCEPTED
 *     responses:
 *       200:
 *         description: Application status updated successfully
 */

export default router;
