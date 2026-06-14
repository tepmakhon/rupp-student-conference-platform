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
  getPendingOpportunities,
  approveOpportunity,
  applyOpportunity,
  rejectOpportunity,
  saveOpportunity,
  unsaveOpportunity,
  getSavedOpportunities,
  getRecentOpportunities,
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
  "/recent",
  getRecentOpportunities
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

router.get(
  "/pending",
  authMiddleware,
  rbac(["ADMIN"]),
  getPendingOpportunities
);

router.patch(
  "/:id/approve",
  authMiddleware,
  rbac(["ADMIN"]),
  approveOpportunity
);

router.patch(
  "/:id/reject",
  authMiddleware,
  rbac(["ADMIN"]),
  rejectOpportunity
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

router.post(
  "/:id/save",
  authMiddleware,
  rbac(["STUDENT"]),
  saveOpportunity
);

router.delete(
  "/:id/save",
  authMiddleware,
  rbac(["STUDENT"]),
  unsaveOpportunity
);

router.get(
  "/saved/list",
  authMiddleware,
  rbac(["STUDENT"]),
  getSavedOpportunities
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
 *     summary: Get Opportunities
 *     tags: [Opportunities]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         example: 1
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         example: 10
 *
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         example: react
 *
 *       - in: query
 *         name: typeId
 *         schema:
 *           type: string
 *         example: 1
 *
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum:
 *             - PENDING
 *             - APPROVED
 *             - REJECTED
 *             - CLOSED
 *
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
 * /api/opportunities/recent:
 *   get:
 *     summary: Get Recent Opportunities
 *     tags: [Opportunities]
 *     description: Returns the latest approved opportunities for dashboard display.
 *     responses:
 *       200:
 *         description: Recent opportunities retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Recent opportunities retrieved
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "1"
 *                       title:
 *                         type: string
 *                         example: Software Engineer Intern
 *                       description:
 *                         type: string
 *                         example: Internship opportunity for students.
 *                       coverImageUrl:
 *                         type: string
 *                         nullable: true
 *                         example: https://res.cloudinary.com/demo/image/upload/sample.jpg
 *                       deadline:
 *                         type: string
 *                         format: date-time
 *                       status:
 *                         type: string
 *                         example: APPROVED
 *                       organization:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "1"
 *                           organizationName:
 *                             type: string
 *                             example: OpenAI Cambodia
 *                       type:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "1"
 *                           typeName:
 *                             type: string
 *                             example: Internship
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
 *               coverImageUrl:
 *                 type: string
 *                 example: https://images.unsplash.com/photo.jpg
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
 * /api/opportunities/pending:
 *   get:
 *     summary: Get Pending Opportunities
 *     tags: [Opportunities]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Pending opportunities retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
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
 * /api/opportunities/{id}/reject:
 *   patch:
 *     summary: Reject Opportunity
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
 *         description: Opportunity rejected successfully
 *       404:
 *         description: Opportunity not found
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

/**
 * @swagger
 * /api/opportunities/{id}/save:
 *   post:
 *     summary: Save Opportunity
 *     tags: [Opportunities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "1"
 *     responses:
 *       201:
 *         description: Opportunity saved
 *       404:
 *         description: Opportunity not found
 */

/**
 * @swagger
 * /api/opportunities/{id}/save:
 *   delete:
 *     summary: Remove Saved Opportunity
 *     tags: [Opportunities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "1"
 *     responses:
 *       200:
 *         description: Opportunity removed from saved list
 *       404:
 *         description: Opportunity not found
 */

/**
 * @swagger
 * /api/opportunities/saved/list:
 *   get:
 *     summary: Get Saved Opportunities
 *     tags: [Opportunities]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Saved opportunities retrieved
 */
export default router;