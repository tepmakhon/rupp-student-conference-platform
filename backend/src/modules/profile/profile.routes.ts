import { validate } from "../../middlewares/validate.middleware.js";
import { updateProfileSchema } from "./profile.validation.js";
import { Router } from "express";

import { authMiddleware } from "../../middlewares/auth.middleware.js";

import { getMyProfile, updateMyProfile } from "./profile.controller.js";

const router = Router();

router.get(
  "/me",

  authMiddleware,

  getMyProfile,
);

router.put(
  "/me",

  authMiddleware,

  validate(updateProfileSchema),
  updateMyProfile,
);

export default router;
