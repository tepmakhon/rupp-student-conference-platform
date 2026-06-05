import { Router } from "express";

import { authMiddleware }
from "../../middlewares/auth.middleware.js";

import { rbac }
from "../../middlewares/rbac.middleware.js";

import { validate } from "../../middlewares/validate.middleware.js";

import {
  createOpportunitySchema,
} from "./opportunity.validation.js";

import {
  createOpportunity,
  getAllOpportunities,
  getOpportunityById,
  approveOpportunity,
  applyOpportunity,
} from "./opportunity.controller.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| PUBLIC
|--------------------------------------------------------------------------
*/

router.get(
  "/",
  getAllOpportunities
);

router.get(
  "/:id",
  getOpportunityById
);

/*
|--------------------------------------------------------------------------
| ORGANIZATION
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  authMiddleware,
  rbac(["ORGANIZATION"]),
  validate(createOpportunitySchema),
  createOpportunity
);

/*
|--------------------------------------------------------------------------
| ADMIN
|--------------------------------------------------------------------------
*/

router.patch(
  "/:id/approve",
  authMiddleware,
  rbac(["ADMIN"]),
  approveOpportunity
);

/*
|--------------------------------------------------------------------------
| STUDENT
|--------------------------------------------------------------------------
*/

router.post(
  "/:id/apply",
  authMiddleware,
  rbac(["STUDENT"]),
  applyOpportunity
);

/**
 * @swagger
 * tags:
 *   name: Opportunities
 *   description: Opportunity Management APIs
 */

/**
 * @swagger
 * /api/opportunities:
 *   get:
 *     summary: Get All Opportunities
 *     tags: [Opportunities]
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
 *         description: Opportunities retrieved successfully
 */

/**
 * @swagger
 * /api/opportunities/{id}:
 *   get:
 *     summary: Get Opportunity By ID
 *     tags: [Opportunities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Opportunity retrieved successfully
 *       404:
 *         description: Opportunity not found
 */

/**
 * @swagger
 * /api/opportunities:
 *   post:
 *     summary: Create Opportunity
 *     tags: [Opportunities]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               requirements:
 *                 type: string
 *               deadline:
 *                 type: string
 *                 format: date
 *               typeId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Opportunity created successfully
 */

/**
 * @swagger
 * /api/opportunities/{id}/approve:
 *   patch:
 *     summary: Approve Opportunity
 *     tags: [Opportunities]
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
 *         description: Opportunity approved successfully
 */

/**
 * @swagger
 * /api/opportunities/{id}/apply:
 *   post:
 *     summary: Apply For Opportunity
 *     tags: [Opportunities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cvUrl:
 *                 type: string
 *     responses:
 *       201:
 *         description: Application submitted successfully
 */
export default router;