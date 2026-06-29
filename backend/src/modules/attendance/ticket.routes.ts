import { Router } from "express";

import { authMiddleware } from "../../middlewares/auth.middleware.js";

import { rbac } from "../../middlewares/rbac.middleware.js";

import { getEventTicket } from "./ticket.controller.js";

const router = Router();

router.get(
  "/events/:eventId/ticket",

  authMiddleware,

  rbac(["STUDENT"]),

  getEventTicket,
);

export default router;
