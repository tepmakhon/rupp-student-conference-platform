import { Router } from "express";

import { authMiddleware } from "../../middlewares/auth.middleware.js";

import { rbac } from "../../middlewares/rbac.middleware.js";

import {
  getStudentAnalytics,
  getOrganizationAnalytics,
  getAdminAnalytics,
} from "./analytics.controller.js";

const router = Router();

router.get("/student", authMiddleware, rbac(["STUDENT"]), getStudentAnalytics);

router.get(
  "/organization",
  authMiddleware,
  rbac(["ORGANIZATION"]),
  getOrganizationAnalytics,
);

router.get("/admin", authMiddleware, rbac(["ADMIN"]), getAdminAnalytics);

export default router;
