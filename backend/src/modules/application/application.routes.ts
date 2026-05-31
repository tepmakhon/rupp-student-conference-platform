import { Router } from "express";

import { authMiddleware }
from "../../middlewares/auth.middleware.js";

import { rbac }
from "../../middlewares/rbac.middleware.js";

import {
  getMyApplications,
  getApplicants,
  updateStatus,
} from "./application.controller.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| STUDENT
|--------------------------------------------------------------------------
*/

router.get(
  "/me",
  authMiddleware,
  rbac(["STUDENT"]),
  getMyApplications
);

/*
|--------------------------------------------------------------------------
| ORGANIZATION
|--------------------------------------------------------------------------
*/

router.get(
  "/opportunity/:id",
  authMiddleware,
  rbac(["ORGANIZATION"]),
  getApplicants
);

router.patch(
  "/:id/status",
  authMiddleware,
  rbac(["ORGANIZATION"]),
  updateStatus
);

export default router;