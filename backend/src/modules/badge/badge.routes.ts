import { Router } from "express";

import {
  getMyBadges,
} from "./badge.controller.js";

import {
  authMiddleware,
} from "../../middlewares/auth.middleware.js";

import {
  rbac,
} from "../../middlewares/rbac.middleware.js";

const router = Router();

router.get(

  "/me",

  authMiddleware,

  rbac(["STUDENT"]),

  getMyBadges

);

export default router;