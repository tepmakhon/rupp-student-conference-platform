import { Router } from "express";

import { authMiddleware }
from "../../middlewares/auth.middleware.js";

import { rbac }
from "../../middlewares/rbac.middleware.js";

import {
  getOrganizationProfile,
  updateLogo,
} from "./organization.controller.js";

const router = Router();

router.get(
  "/me",
  authMiddleware,
  rbac(["ORGANIZATION"]),
  getOrganizationProfile
);

router.patch(
  "/logo",
  authMiddleware,
  rbac(["ORGANIZATION"]),
  updateLogo
);

export default router;