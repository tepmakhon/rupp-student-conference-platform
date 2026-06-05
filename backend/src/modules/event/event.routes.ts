import { Router } from "express";

import {
  createEventController,
  getApprovedEventsController,
  getPendingEventsController,
  approveEventController,
  rejectEventController,
  registerEventController,
} from "./event.controller.js";

import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { rbac } from "../../middlewares/rbac.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";

import {
  createEventSchema,
} from "./event.validation.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Event Management APIs
 */

/**
 * @swagger
 * /api/events:
 *   post:
 *     summary: Create Event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - location
 *               - categoryId
 *               - eventDate
 *             properties:
 *               title:
 *                 type: string
 *                 example: Google Developer Workshop 2026
 *               description:
 *                 type: string
 *                 example: Learn modern web development
 *               location:
 *                 type: string
 *                 example: RUPP Conference Hall
 *               categoryId:
 *                 type: string
 *                 example: "1"
 *               capacity:
 *                 type: integer
 *                 example: 100
 *               eventDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-06-01T08:00:00.000Z
 *     responses:
 *       201:
 *         description: Event created
 */
router.post(
  "/",
  authMiddleware,
  rbac(["ORGANIZATION"]),
  validate(createEventSchema),
  createEventController
);

/**
 * @swagger
 * /api/events/approved:
 *   get:
 *     summary: Get Approved Events
 *     tags: [Events]
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
 *         description: List approved events
 */
router.get(
  "/approved",
  getApprovedEventsController
);

/**
 * @swagger
 * /api/events/pending:
 *   get:
 *     summary: Get Pending Events
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List pending events
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 */
router.get(
  "/pending",
  authMiddleware,
  rbac(["ADMIN"]),
  getPendingEventsController
);

/**
 * @swagger
 * /api/events/{id}/approve:
 *   patch:
 *     summary: Approve Event
 *     tags: [Events]
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
 *         description: Event approved
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 *       404:
 *         description: Event not found
 */
router.patch(
  "/:id/approve",
  authMiddleware,
  rbac(["ADMIN"]),
  approveEventController
);

/**
 * @swagger
 * /api/events/{id}/reject:
 *   patch:
 *     summary: Reject Event
 *     tags: [Events]
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
 *         description: Event rejected
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 *       404:
 *         description: Event not found
 */
router.patch(
  "/:id/reject",
  authMiddleware,
  rbac(["ADMIN"]),
  rejectEventController
);

/**
 * @swagger
 * /api/events/{id}/register:
 *   post:
 *     summary: Register For Event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Registration successful
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Student access required
 *       404:
 *         description: Event not found
 */

router.post(
  "/:id/register",
  authMiddleware,
  rbac(["STUDENT"]),
  registerEventController
);

export default router;