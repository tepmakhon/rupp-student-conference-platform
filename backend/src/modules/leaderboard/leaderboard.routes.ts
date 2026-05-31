import { Router } from "express";

import {
  getLeaderboard,
} from "./leaderboard.controller.js";

const router = Router();

router.get("/", getLeaderboard);

export default router;