import { Router } from "express";

import {
  authMiddleware,
} from "../../middlewares/auth.middleware.js";

import {
  globalSearch,
} from "./search.controller.js";

const router = Router();

router.get(
  "/",
  authMiddleware,
  globalSearch
);

export default router;