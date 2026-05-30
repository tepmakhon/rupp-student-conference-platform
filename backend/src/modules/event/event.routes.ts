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

const router = Router();

router.post(
  "/",
  authMiddleware,
  rbac(["ORGANIZATION"]),
  createEventController
);

router.get(
  "/approved",
  getApprovedEventsController
);

router.get(
  "/pending",
  authMiddleware,
  rbac(["ADMIN"]),
  getPendingEventsController
);

router.patch(
  "/:id/approve",
  authMiddleware,
  rbac(["ADMIN"]),
  approveEventController
);

router.patch(
  "/:id/reject",
  authMiddleware,
  rbac(["ADMIN"]),
  rejectEventController
);

router.post(
  "/:id/register",
  authMiddleware,
  rbac(["STUDENT"]),
  registerEventController
);

export default router;