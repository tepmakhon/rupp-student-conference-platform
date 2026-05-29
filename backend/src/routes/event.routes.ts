import express from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/rbac.middleware.js";

import {
  createEventController,
  getEventsController,
  registerEventController,
} from "../controllers/event.controller.js";

const router = express.Router();

/**
 * PUBLIC - VIEW EVENTS
 */
router.get("/", getEventsController);

/**
 * ORGANIZATION ONLY - CREATE EVENT
 */
router.post(
  "/",
  authenticate,
  authorize("ORGANIZATION"),
  createEventController
);

/**
 * STUDENT ONLY - REGISTER EVENT
 */
router.post(
  "/:id/register",
  authenticate,
  authorize("STUDENT"),
  registerEventController
);

export default router;