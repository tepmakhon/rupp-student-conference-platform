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
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *               categoryId:
 *                 type: string
 *               capacity:
 *                 type: integer
 *               eventDate:
 *                 type: string
 *                 format: date
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
 *       200:
 *         description: Registration successful
 */

router.post(
  "/:id/register",
  authMiddleware,
  rbac(["STUDENT"]),
  registerEventController
);

export default router;